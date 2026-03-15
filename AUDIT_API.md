# Audit Node.js - Greek Gods Arena API

> Date : 2026-03-14

---

## Bugs critiques

### 1. La défense n'est pas appliquée aux dégâts réels — `fightUtils.ts:175-178`

```typescript
// launchAttack calcule correctement les dégâts (attackValue - defense)
let damages = launchAttack(attackValue, attackingCharacter.magik, defendingCharacter.defense);

// Mais applyDamages reçoit attackValue, pas damages
updatedDefenderHealth = applyDamages(
  attackValue,       // ← DEVRAIT être damages
  defendingCharacter.health
);
```

`applyDamages` soustrait `attackValue` brut au lieu de `damages` (qui intègre la défense). La stat `defense` est utilisée uniquement pour déterminer si l'attaque "réussit" mais n'impacte jamais les HP réellement soustraits. La défense est une stat inutile dans le moteur de combat.

---

### 2. Le bonus magik ne s'applique pas non plus aux dégâts — `fightUtils.ts:212-221`

Dans la continuité du bug précédent : `launchAttack` calcule `damages + magik` si `damages === magik`, mais `applyDamages` reçoit `attackValue` brut. Le bonus magik est calculé pour rien.

---

### 3. Boucle `while` potentiellement infinie — `fightUtils.ts:133-142`

```typescript
while (!fightOver) {
  const turnResult = await newTurn(fight, turnCount, attacker, defender);
  fightOver = turnResult.fightFinished;
  // ...
}
```

Si `attackValue <= defenseSkillPoints` à chaque tour pour les deux combattants (`damages <= 0` en permanence), `fightFinished` ne sera jamais `true`. Le serveur Node.js se retrouve dans une boucle infinie d'appels DB qui sature la connexion Mongoose.

**Fix :** ajouter une limite max de tours (`const MAX_TURNS = 100`).

---

### 4. `$ne: currentTeamId` sur ObjectId sans conversion — `fightUtils.ts:19, 47, 78`

```typescript
_id: { $ne: currentTeamId }, // ← string comparé à ObjectId en agrégation
```

Dans une pipeline `$match`, MongoDB compare strictement les types. Un `string` ne sera jamais `$ne` d'un `ObjectId` → la condition est toujours vraie et l'exclusion de l'équipe courante ne fonctionne pas. Un personnage peut se retrouver à combattre un coéquipier.

**Fix :** `_id: { $ne: new mongoose.Types.ObjectId(currentTeamId) }`.

---

### 5. Aucune validation du format ObjectId avant les requêtes DB

```typescript
// teams/index.ts:31, fights/index.ts:26
const { id } = req.params;
const team = await getTeam(id); // CastError Mongoose si id n'est pas un ObjectId valide
```

Si l'utilisateur passe `GET /teams/invalid-id`, Mongoose lève une `CastError` non gérée qui expose des détails internes. Même problème sur `/fights/:id`.

**Fix :** valider avec `mongoose.isValidObjectId(id)` avant la requête, ou via un middleware.

---

### 6. Pattern try/catch dans les services qui perd les stacktraces et expose des messages Mongoose

```typescript
} catch (error) {
  throw new HttpError(
    error.statusCode || 500,
    "Fight Error",
    error.message || "...", // ← expose error.message brut au client
    true
  );
}
```

Deux problèmes :
- Une `HttpError(404)` lancée dans un DataManager est re-wrappée dans une nouvelle `HttpError` avec un message différent → le message original est perdu, le stacktrace aussi.
- Si une erreur Mongoose arrive (ex: timeout, duplicate key), `error.message` contient le message brut de Mongoose exposé directement au client.

---

## Bugs mineurs

### 7. Typo dans le nom de paramètre du constructeur — `httpError.ts:13`

```typescript
constructor(statusCode: number, descritpion: string, ...) // ← "descritpion"
```

Typo propagé silencieusement car `this.description = descritpion` compile sans erreur.

---

### 8. Typo de variable — `characterUtils.ts:77`

```typescript
const healthkSkillPoints = calculateHealthSkillPointsUsed(...) // ← "healthkSkillPoints"
```

Le calcul final à la ligne 94 utilise le même nom donc ça fonctionne, mais c'est une erreur de nommage qui rend le code difficile à lire.

---

### 9. Fautes de frappe dans les messages d'erreur — multiples fichiers

| Fichier | Ligne | Message |
|---|---|---|
| `characterService.ts` | 36, 101, 132, 162 | `"in you characters list"` → `"your"` |
| `fightService.ts` | 25 | `"in you characters list"` → `"your"` |
| `fightService.ts` | 57 | `"retreiving"` → `"retrieving"` |

---

## Problèmes de sécurité

### 10. Aucune authentification ni autorisation

`config.ts` charge `jwtSecret` mais il n'est utilisé nulle part. Aucun endpoint de login, aucun middleware de vérification de token. N'importe qui peut :
- Lire toutes les équipes et tous les personnages
- Modifier les stats de n'importe quel personnage
- Créer des combats à volonté

---

### 11. Aucune validation du corps des requêtes

```typescript
// teams/index.ts:87-89
const { characterName } = req.body; // aucune validation
const character = await createCharacter(characterName, id);
```

`req.body` est passé directement aux services sans vérifier la présence, le type ou le format des champs. `joi` est installé en dépendance mais jamais utilisé.

Exemples de cas non gérés :
- `characterName` absent → `undefined` passé au service
- `characterName` = objet `{}` → NoSQL injection potentielle si mal géré plus bas
- Body `POST /fights` vide → `teamId` et `characterName` à `undefined`

---

### 12. Pas de rate limiting

Aucun middleware de rate limiting. La route `POST /fights` déclenche une logique lourde (3 agrégations + boucle while + N sauvegardes DB). Elle peut être spammée librement pour saturer le serveur.

---

## Violations SOLID / Mauvaises pratiques

### 13. Sémantique HTTP incorrecte — `teams/index.ts:120`

```typescript
router.post("/:id/characters/:characterName", ...) // pour une mise à jour
```

Une mise à jour de ressource existante doit utiliser `PUT` (remplacement total) ou `PATCH` (mise à jour partielle), pas `POST`. `POST` signifie "créer une nouvelle ressource".

---

### 14. Status codes incorrects sur les créations

```typescript
// teams/index.ts:91
return res.status(200).json({...}); // après createCharacter → devrait être 201
```

Toutes les routes `POST` de création retournent `200` au lieu de `201 Created`. La route de suppression (`DELETE`) retourne aussi `200` au lieu de `204 No Content`.

---

### 15. `notFoundHandler` enregistré après `errorHandler` — `index.ts:25-26`

```typescript
app.use(errorHandler);    // ← en premier
app.use(notFoundHandler); // ← en second (jamais atteint si errorHandler absorbe)
```

L'ordre conventionnel est : routes → 404 handler → error handler. Le `notFoundHandler` doit être avant `errorHandler`.

---

### 16. `validateCharacterNewProperties` bloque les mises à jour avec `skillPoints === 0` — `characterUtils.ts:27-33`

```typescript
if (character.skillPoints === 0)
  throw new HttpError(400, ..., `Your character has 0 skillPoints...`);
```

Ce check est trop agressif : si `skillPoints === 0` et que la mise à jour ne consomme aucun point (même valeurs), l'erreur est quand même levée. La validation correcte est faite plus loin dans `validateSkillPoints` (`skillPointsUsed > character.skillPoints`). Ce premier check est redondant et incorrectement restrictif.

---

### 17. `findOpponent` — triple agrégation en cascade — `fightUtils.ts:16-119`

Trois requêtes d'agrégation distinctes et séquentielles pour un seul matching d'adversaire. La logique de fallback (même niveau → ±5 niveaux → n'importe qui) peut être exprimée en **une seule** pipeline avec `$facet` ou en triant par priorité. Tel quel, dans le pire cas, c'est 3 aller-retours DB bloquants.

---

### 18. `characterService.ts` — double lecture de la team pour vérifier + créer

```typescript
const currentTeam = await TeamDM.getTeam(teamId);         // 1ère lecture
// ...
const updatedTeam = await CharacterDM.createCharacter(...); // sauvegarde
const createdCharacter = await CharacterDM.getCharacterByName(updatedTeam, characterName); // relecture
```

Après `createCharacter`, le personnage créé pourrait être retourné directement depuis le document sauvegardé plutôt que de faire une troisième lecture.

---

### 19. Aucune couverture de tests réelle

Un seul test existe (`httpError.test.ts`) qui teste le constructeur de `HttpError`. Aucun test pour :
- Les routes (supertest est installé mais non utilisé)
- Les services (logique métier critique non testée)
- `fightUtils` (algorithme de combat non testé)
- `characterUtils` (calcul de skill points non testé)

`mongodb-memory-server` et `dataFactory` sont prêts mais non utilisés dans des tests.

---

## Dépendances / Configuration

### 20. `faker` dans `dependencies` au lieu de `devDependencies`

```json
"dependencies": {
  "faker": "^5.5.3" // ← librairie de données de test en prod
}
```

`faker` est utilisé uniquement dans `seed.ts` et `dataFactory.ts` (test utils). Il ne doit pas être dans le bundle de production.

---

### 21. `joi` et `bluebird` installés mais jamais utilisés

- `joi` : librairie de validation installée mais aucun schéma de validation n'est défini
- `bluebird` : librairie de Promises installée alors que Node.js natif gère les Promises. Dead dependency.

---

### 22. `seed.ts` exécuté à chaque démarrage du serveur

```typescript
// server.ts
mongoose.connect(...).then(() => {
  seedData(); // requête DB inutile à chaque boot en production
});
```

Le seeding vérifie si des données existent avant d'insérer, mais la requête de vérification est faite à chaque démarrage. Ce devrait être un script standalone (`npm run seed`), pas un effet de bord du boot.

---

### 23. Dépendances obsolètes

| Package | Version | Remarque |
|---|---|---|
| express | 4.17.1 | Version 5.x disponible |
| helmet | 4.6.0 | Version 7.x disponible (breaking changes sécurité) |
| dotenv | 10.0.0 | Version 16.x disponible |
| faker | 5.5.3 | Remplacé par `@faker-js/faker` (fork maintenu) |
| nodemon | 2.0.12 | Version 3.x disponible |

---

## Résumé des priorités

| Priorité | # | Problème |
|---|---|---|
| 🔴 Critique | 1, 2, 3, 10, 11 | Défense/magik ignorées dans les dégâts, boucle infinie, pas d'auth, pas de validation des inputs |
| 🟠 Important | 4, 5, 6, 12 | ObjectId non converti, CastError exposé, stacktraces perdus, pas de rate limiting |
| 🟡 Qualité | 13, 14, 15, 16, 17, 18, 19 | Sémantique HTTP, status codes, ordre middleware, logique de validation, agrégations, couverture de tests |
| 🔵 Maintenance | 7, 8, 9, 20, 21, 22, 23 | Typos, dépendances mal catégorisées/inutilisées/obsolètes, seed en boot |
