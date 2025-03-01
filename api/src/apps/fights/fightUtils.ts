import mongoose from "mongoose";
import * as FightDM from "./fightDataManager";
import * as CharacterDM from "../characters/characterDataManager";
import * as TurnDM from "./turns/turnDataManager";
import HttpError from "../../common/error/httpError";
import { ICharacter } from "../characters/characterModel";
import { IFight } from "./fightModel";
import Team from "../teams/teamsSchema";

export const findOpponent = async (
  currentTeamId: string,
  firstOpponent: ICharacter
): Promise<ICharacter> => {
  let secondOpponent;

  let availableCharacters = await Team.aggregate([
    {
      $match: {
        "characters.level": firstOpponent.level,
        _id: { $ne: currentTeamId },
      },
    },
    {
      $unwind: "$characters",
    },
    {
      $match: {
        "characters.level": firstOpponent.level,
        "characters.defense": { $lt: firstOpponent.attack },
        "characters._id": { $ne: firstOpponent._id },
      },
    },
    {
      $limit: 10,
    },
    {
      $project: {
        _id: 0,
        character: "$characters",
      },
    },
  ]);
  if (!availableCharacters || availableCharacters.length === 0) {
    availableCharacters = await Team.aggregate([
      {
        $match: {
          "characters.level": firstOpponent.level,
          _id: { $ne: currentTeamId },
        },
      },
      {
        $unwind: "$characters",
      },
      {
        $match: {
          "characters.level": {
            $gt: firstOpponent.level - 5,
            $lt: firstOpponent.level + 5,
          },
          "characters.defense": { $lt: firstOpponent.attack },
          "characters._id": { $ne: firstOpponent._id },
        },
      },
      {
        $limit: 10,
      },
      {
        $project: {
          _id: 0,
          character: "$characters",
        },
      },
    ]);
    if (!availableCharacters || availableCharacters.length === 0) {
      availableCharacters = await Team.aggregate([
        {
          $match: {
            _id: { $ne: currentTeamId },
          },
        },
        {
          $unwind: "$characters",
        },
        {
          $match: {
            "characters._id": { $ne: firstOpponent._id },
            "characters.defense": { $lt: firstOpponent.attack },
          },
        },
        {
          $limit: 10,
        },
        {
          $project: {
            _id: 0,
            character: "$characters",
          },
        },
      ]);
      if (!availableCharacters || availableCharacters.length === 0)
        throw new HttpError(
          404,
          "New Fight Error",
          `There is no characters available for a fight at the moment !`,
          true
        );
    }
    availableCharacters.sort(
      (aggregate1, aggregate2) =>
        Math.abs(aggregate1.character.level - firstOpponent.level) -
        Math.abs(aggregate2.character.level - firstOpponent.level)
    );
    secondOpponent = availableCharacters[0].character;
  } else {
    secondOpponent =
      availableCharacters[
        Math.floor(Math.random() * availableCharacters.length)
      ].character;
  }
  return secondOpponent;
};

export const launchFight = async (
  firstOpponent: ICharacter,
  secondOpponent: ICharacter
): Promise<IFight> => {
  let fight = await FightDM.createFight(firstOpponent, secondOpponent);
  let turnCount = 0;
  let fightOver = false;
  let attacker: ICharacter = firstOpponent;
  let defender: ICharacter = secondOpponent;

  while (!fightOver) {
    turnCount = turnCount + 1;
    const turnResult = await newTurn(fight, turnCount, attacker, defender);
    fightOver = turnResult.fightFinished;
    if (!fightOver) {
      defender = attacker;
      attacker = turnResult.defendingCharacter;
    }
    fight = turnResult.updatedFight;
  }

  fight.finished = true;
  fight.winner = attacker._id;
  fight.loser = defender._id;
  fight = await fight.save();
  await updateOpponentsProperties(attacker, defender);
  const finishedFight: IFight = fight.toObject();
  return finishedFight;
};

const newTurn = async (
  fight: IFight & mongoose.Document<any, any, IFight>,
  turnCount: number,
  attackingCharacter: ICharacter,
  defendingCharacter: ICharacter
) => {
  let attackSuccess: boolean;
  let fightFinished = false;
  let updatedDefenderHealth = defendingCharacter.health;

  const attackValue = rollDice(attackingCharacter.attack);
  let damages = launchAttack(
    attackValue,
    attackingCharacter.magik,
    defendingCharacter.defense
  );

  if (damages <= 0) {
    damages = 0;
    attackSuccess = false;
  } else {
    attackSuccess = true;
    updatedDefenderHealth = applyDamages(
      attackValue,
      defendingCharacter.health
    );
    if (updatedDefenderHealth <= 0) {
      updatedDefenderHealth = 0;
      fightFinished = true;
    }
  }
  defendingCharacter.health = updatedDefenderHealth;
  const attacker = {
    id: attackingCharacter._id,
    attackValue,
    remainingHealth: attackingCharacter.health,
  };
  const defender = {
    id: defendingCharacter._id,
    defenseSkillPoints: defendingCharacter.defense,
    remainingHealth: updatedDefenderHealth,
  };

  const updatedFight = await TurnDM.createTurn(
    fight,
    turnCount,
    attacker,
    defender,
    damages,
    attackSuccess
  );
  return { fightFinished, defendingCharacter, updatedFight };
};

const rollDice = (attackSkillPoints: number): number => {
  const attackValue = Math.floor(Math.random() * attackSkillPoints + 1);
  return attackValue;
};

const launchAttack = (
  attackValue: number,
  magik: number,
  defenseSkillPoints: number
): number => {
  let damages = attackValue - defenseSkillPoints;
  if (damages <= 0) return damages;
  if (damages === magik) damages = damages + magik;
  return damages;
};

const applyDamages = (
  attackValue: number,
  defendingCharacterHealth: number
): number => {
  const updatedHealth = defendingCharacterHealth - attackValue;
  return updatedHealth;
};

const updateOpponentsProperties = async (
  attacker: ICharacter,
  defender: ICharacter
): Promise<void> => {
  await CharacterDM.updateCharacterById(attacker._id, attacker.name, {
    skillPoints: attacker.skillPoints + 1,
    level: attacker.level + 1,
  });
  let defenderLevel = defender.level - 1;
  defenderLevel = defenderLevel < 1 ? 1 : defenderLevel;
  await CharacterDM.updateCharacterById(defender._id, defender.name, {
    level: defenderLevel,
  });
};
