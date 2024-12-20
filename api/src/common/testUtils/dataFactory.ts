// import { hashPassword } from '../../components/auth/authService';
import User from '../../components/users/userSchema';
import * as faker from 'faker';
import { IUser } from '../../components/users/userModel';
import {
  GreekGods,
  GreekGodsArray,
  ICharacter,
} from '../../components/users/characters/characterModel';
import * as UniverseDM from '../../components/universes/universesDataManager';
import * as CharacterDM from '../../components/users/characters/characterDataManager';
import * as FightUtils from '../../components/fights/fightUtils';
import { IFight } from '../../components/fights/fightModel';
import Character from '../../components/users/characters/characterSchema';
import Universe from '../../components/universes/universesSchema';
import { IUniverse } from '../../components/universes/universesModel';

export enum FakePassword {
  GOOD = 'abcABC123456!',
  GOOD_2 = 'defDEF123456!',
  LESS_THAN_8_CHAR = 'aA123!',
  // NO_DIGIT = 'abcdefABCDEF!',
  // No_LOWERCASE = 'ABCDEF123456!',
  // NO_UPPERCASE = 'abcdef123456!',
  // MORE_THAN_26_CHAR = 'abcABC123456!abcABC123456!',
}

// créer un user
export const createUser = async (): Promise<IUser> => {
  try {
    const username = faker.internet.userName();
    const email = faker.internet.email();
    const password = FakePassword.GOOD;
    // const hashedPassword: string = await hashPassword(password);
    const characters: ICharacter[] = GreekGodsArray.map(
      (greekGod: GreekGods) => {
        return new Character({ name: greekGod });
      }
    );
    const newUser = new User({
      username,
      email,
      password,
      characters,
    });
    const userSignedUp = await newUser.save();
    const { password: userPassword, __v, ...rest } = userSignedUp.toObject();
    const userInfo: IUser = { ...rest, password };
    return userInfo;
  } catch (error) {
    throw new Error(error);
  }
};

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
