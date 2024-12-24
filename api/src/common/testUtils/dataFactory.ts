import * as UniverseDM from "../../apps/universes/universesDataManager";
import * as CharacterDM from "../../apps/characters/characterDataManager";
import * as FightUtils from "../../apps/fights/fightUtils";
import { IFight } from "../../apps/fights/fightModel";
import Universe from "../../apps/universes/universesSchema";
import { IUniverse } from "../../apps/universes/universesModel";
import {
  GreekGods,
  GreekGodsArray,
  ICharacter,
} from "../../apps/characters/characterModel";
import Character from "../../apps/characters/characterSchema";

// create universe
export const createUniverse = async (
  universeName: string
): Promise<IUniverse> => {
  try {
    const characters: ICharacter[] = GreekGodsArray.map(
      (greekGod: GreekGods) => {
        return new Character({ name: greekGod });
      }
    );
    let newUniverse = new Universe({
      universeName,
      characters,
    });
    newUniverse = await newUniverse.save();
    return newUniverse;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateCharacter = async (
  universeId: string,
  characterName: string
): Promise<ICharacter> => {
  try {
    const currentUniverse = await UniverseDM.getUniverse(universeId);

    const updatedCharacterProperties = {
      skillPoints: 42,
      health: 20,
      attack: 14,
      defense: 12,
      magik: 2,
      level: 1,
    };
    const updatedCharacter = await CharacterDM.updateCharacter(
      currentUniverse,
      characterName,
      updatedCharacterProperties
    );
    return updatedCharacter;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateCharacterProperties = async (
  universeId: string,
  characterName: string,
  newCharacterProperties: Partial<ICharacter>
): Promise<ICharacter> => {
  try {
    const currentUniverse = await UniverseDM.getUniverse(universeId);
    const updatedCharacter = await CharacterDM.updateCharacter(
      currentUniverse,
      characterName,
      newCharacterProperties
    );
    return updatedCharacter;
  } catch (error) {
    throw new Error(error);
  }
};

export const newFight = async (
  firstUniverseId: string,
  secondUniverseId: string
): Promise<IFight> => {
  try {
    const firstUniverse = await UniverseDM.getUniverse(firstUniverseId);
    const secondUniverse = await UniverseDM.getUniverse(secondUniverseId);

    const fight = await FightUtils.launchFight(
      firstUniverse.characters[0],
      secondUniverse.characters[1]
    );
    return fight;
  } catch (error) {
    throw new Error(error);
  }
};
