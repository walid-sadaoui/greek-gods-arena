# Audit React - Greek Gods Arena

> Date : 2026-03-14

---

## Bugs

### 1. Mutation directe du state du context — `CharacterEdit.tsx:194`

```typescript
// PROBLÈME : mutation directe d'un objet partagé
teamSelected!.characters[updatedCharacterIndex] = data.character;
```

`teamSelected` vient du context. Le muter directement sans passer par `setTeams` signifie que React ne détecte pas le changement → pas de re-render des autres consommateurs. Résultat : l'UI peut afficher des données périmées.

**Fix :** créer une copie via `setTeams(...)` ou exposer une action dédiée dans le context.

---

### 2. `fight.turns[-1]` → `undefined` passé à `FightOpponent` — `FightRing.tsx:42`

```typescript
turn={fight.turns[turnCount]}  // turnCount peut valoir -1
```

`fight.turns[-1]` est `undefined` en JS. Si `FightOpponent` accède à des propriétés de `turn`, c'est un crash garanti au chargement de la page.

---

### 3. Stale closure dans `TextDisplay.tsx` — `showNextText`

```typescript
setTurnStatus((prev) => ({
  ...prev,
  displayedText: prev.displayedText + turnStatus.description[turnStatus.currentIndex] + " ",
  // ↑ lit turnStatus depuis la closure, pas depuis prev → valeur potentiellement périmée
  currentIndex: prev.currentIndex + 1,
}));
```

`prev.currentIndex` est correct (functional update), mais `turnStatus.description[turnStatus.currentIndex]` lit l'index depuis la closure capturée au moment de la création de la fonction. Si un re-render se produit entre deux appels, l'index est décalé → mauvais mot affiché.

**Fix :** lire uniquement depuis `prev` dans le functional update.

---

### 4. `toggleMute` — stale closure — `audioContext.tsx:29`

```typescript
const toggleMute = () => {
  setIsMuted(!isMuted); // ← capture isMuted par closure
};
```

Si `toggleMute` est appelé rapidement en série, `isMuted` peut être périmé.

**Fix :** `setIsMuted(prev => !prev)`.

---

### 5. Volume non synchronisé avec l'audio — `audioContext.tsx`

`setVolume` met à jour le state mais aucun `useEffect` ne surveille `volume` pour appliquer `audioRef.current.volume = volume`. Changer le volume n'a aucun effet sur l'audio réel.

---

### 6. `useEffect` manque la dépendance `id` — `ArenaFight/index.tsx:16-24`

```typescript
React.useEffect(() => {
  prepareFight(); // utilise `id`
}, []); // ← id absent des deps
```

`eslint-plugin-react-hooks/exhaustive-deps` rapporterait ce warning. Fonctionnellement mineur (le paramètre de route ne change pas), mais mauvaise pratique qui peut créer des bugs si la page devient réutilisable.

---

### 7. `useEffect` manque `fight` dans les dépendances — `ArenaFight/index.tsx:26-28`

```typescript
React.useEffect(() => {
  if (fight && turnCount === fight.turns.length - 1) setShowModal(true);
}, [turnCount]); // ← fight absent
```

Si `fight` est encore `undefined` au premier render et que `turnCount` change avant que `fight` soit chargé, la condition ne sera jamais réévaluée avec le bon `fight`.

---

### 8. `useEffect` avec deps vides utilise des fonctions du context — `FightRing.tsx:25-27`

```typescript
useEffect(() => {
  if (!isMuted) toggleMute(); // isMuted et toggleMute absents des deps
}, []);
```

Double problème : stale closure + effet de bord inattendu (forcer le mute à chaque montage du composant est une logique métier cachée dans un `useEffect` sans deps).

---

## Violations SOLID / Mauvaises pratiques

### 9. `CharacterEdit.tsx` — God Component (SRP)

Un seul composant fait tout :
- Calcul des coûts de skill points (`getMaxPropertyValue`, `getMaxHealthValue`)
- Logique d'augmentation/diminution (`increaseSkill`, `decreaseSkill`)
- Appel API (`updateCharacter`)
- Mise à jour du context parent
- Rendu du formulaire

Le calcul métier (coûts) et la communication API doivent être extraits.

---

### 10. `increaseSkill` / `decreaseSkill` — 120 lignes de switch dupliqués

```typescript
// increaseSkill : 60 lignes de switch
// decreaseSkill : 60 lignes de switch identiques en sens inverse
```

La même structure se répète 4 fois × 2 fonctions. Ajouter un skill nécessite de modifier 3 endroits. Violation flagrante de DRY/KISS.

**Exemple de fix :**
```typescript
const SKILL_COST = {
  health: () => 1,
  attack: (v: number) => Math.ceil((v + 1) / 5),
  defense: (v: number) => Math.ceil((v + 1) / 5),
  magik: (v: number) => Math.ceil((v + 1) / 5),
} as const;

const updateSkill = (skillName: keyof typeof SKILL_COST, delta: 1 | -1) => {
  const cost = delta > 0
    ? SKILL_COST[skillName](characterToEdit[skillName])
    : -SKILL_COST[skillName](characterToEdit[skillName] - 1);
  setCharacterToEdit(prev => ({
    ...prev,
    [skillName]: prev[skillName] + delta,
    skillPoints: prev.skillPoints - cost,
  }));
};
```

---

### 11. Double spread inutile — `CharacterEdit.tsx` (x8 occurrences)

```typescript
setCharacterToEdit({
  ...characterToEdit,
  ...{ health: ..., skillPoints: ... }, // ← inutile
});
```

Le second spread objet est superflu.

---

### 12. Skill names en string literals non typées

`"health"`, `"attack"`, `"defense"`, `"magik"` sont des chaînes passées en paramètre dans `updateSkill`, `increaseSkill`, `decreaseSkill`. Aucune sécurité TypeScript — une faute de frappe compile sans erreur.

**Fix :** `type SkillName = "health" | "attack" | "defense" | "magik"` ou utiliser `keyof Pick<Character, ...>`.

---

### 13. `TeamContext` expose `setTeams` et `setTeamSelected` bruts

Exposer les setters raw dans le context casse l'encapsulation. N'importe quel consommateur peut écraser l'état arbitrairement.

**Fix :** exposer des actions nommées : `selectTeam(team)`, `updateCharacterInTeam(character)`.

---

### 14. `TeamContext` rend du JSX de chargement (SRP)

```typescript
if (!teams || teams.length === 0) return <div>Loading...</div>;
```

Un context/provider ne doit pas rendre d'UI. La logique de loading doit être dans le contexte (exposer `isLoading: boolean`) et gérée par les composants consommateurs.

---

### 15. Pas de gestion d'erreur sur les appels API

```typescript
// TeamContext
const { data } = await getTeams();
// Si l'API échoue → data = undefined, teams reste vide, Loading... à l'infini
```

Aucun `try/catch`, aucun état d'erreur exposé, aucun message utilisateur en cas d'échec réseau.

---

### 16. Aucun Error Boundary

Une exception dans `FightOpponent`, `FightRing`, ou `CharacterEdit` fait planter toute l'application silencieusement (écran blanc). Aucun `<ErrorBoundary>` n'existe dans le projet.

---

### 17. `Header` dupliqué dans chaque route — `App.tsx`

```typescript
<Route path="/lobby"><Header /><Lobby /></Route>
<Route path="/lobby/select-god"><Header /><CharacterSelect /></Route>
<Route path="/arena"><Header /><Arena /></Route>
```

Viole DRY. Si le Header évolue, il faut modifier chaque route.

**Fix :** un composant `Layout` wrappant les routes qui en ont besoin.

---

### 18. Pas de lazy loading des routes — `App.tsx`

Toutes les pages sont importées statiquement. Le bundle initial charge du code pour des pages non visitées.

**Fix :** `React.lazy` + `Suspense` pour chaque route.

---

### 19. `audioContext.tsx` — naming conflict avec `Web Audio API`

```typescript
const AudioContext = createContext<AudioContextType | undefined>(undefined);
```

`AudioContext` est le nom du constructeur natif de la Web Audio API (`new AudioContext()`). Ce shadowing peut créer de la confusion et des erreurs dans certains environnements.

---

### 20. `playAudio` — structure inutilement complexe — `audioContext.tsx`

La fonction pause un audio existant avant d'en créer un nouveau, mais elle n'est appelée qu'une seule fois (à l'init). La logique de "pause if exists" est mort code au premier appel.

---

### 21. Non-null assertions `!` abusées — `CharacterEdit.tsx`

```typescript
teamSelected!._id
teamSelected!.characters
teamSelected!.characters[updatedCharacterIndex]
```

Ces `!` contournent la vérification TypeScript. Si `teamSelected` est `undefined`, c'est un crash runtime non détecté à la compilation.

---

## Dépendances / Configuration

### 22. `swr` déclaré mais jamais utilisé

`package.json` liste `swr` comme dépendance, mais tout le fetching est fait manuellement avec `fetch`. Dead dependency qui alourdit le bundle.

---

### 23. `yup` déclaré mais jamais utilisé

Même constat — `yup` est listé mais `CharacterEdit` valide manuellement sans Yup.

---

### 24. Dépendances très anciennes

| Package | Version actuelle | Dernière stable |
|---|---|---|
| React | 17.0.0 | 19.x |
| React Router DOM | 5.3.0 | 6.x |
| Framer Motion | 5.3.0 | 11.x |
| Vite | 2.5.2 | 5.x |
| `@vitejs/plugin-react-refresh` | — | **déprécié** → `@vitejs/plugin-react` |

`@vitejs/plugin-react-refresh` est officiellement déprécié depuis Vite 3.

---

### 25. `tsconfig.json` : `"jsx": "react"` au lieu de `"jsx": "react-jsx"`

React 17 supporte le nouveau JSX transform (pas besoin d'importer React dans chaque fichier). Mais le `tsconfig` utilise encore l'ancien transform. L'eslint a `react/react-in-jsx-scope: OFF` (correct), mais le compilateur TS n'est pas aligné.

---

## Résumé des priorités

| Priorité | # | Problème |
|---|---|---|
| 🔴 Critique | 1, 2 | Mutation directe du context, `turns[-1]` undefined |
| 🟠 Important | 3, 4, 5, 15, 16 | Stale closures, volume non sync, pas de gestion d'erreur, pas d'Error Boundary |
| 🟡 Qualité | 6, 7, 8, 9, 10, 13, 14, 17, 18 | useEffect deps manquantes, SRP, switch dupliqués, context trop permissif, Header dupliqué, no lazy loading |
| 🔵 Maintenance | 11, 12, 19, 20, 21, 22, 23, 24, 25 | Double spread, string literals, naming conflict, dead deps, dépendances obsolètes |
