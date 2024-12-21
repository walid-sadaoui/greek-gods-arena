import mongoose from 'mongoose';
import { ICharacter } from './characterModel';
import Character from './characterSchema';
import { UniverseData } from '../../universes/universesModel';
import Universe from '../../universes/universesSchema';

export const createCharacter = async (
  universe: UniverseData & mongoose.Document<any, any, UniverseData>,
  characterName: string
): Promise<UniverseData & mongoose.Document<any, any, UniverseData>> => {
  const newCharacter = new Character({ name: characterName });
  universe.characters.push(newCharacter);
  const createdUniverse = await universe.save();
  return createdUniverse;
};

export const getCharacters = async (
  universe: UniverseData & mongoose.Document<any, any, UniverseData>
): Promise<ICharacter[]> => {
  const characterList: ICharacter[] = universe.toObject().characters;
  return characterList;
};

export const getCharacterByName = async (
  universe: UniverseData & mongoose.Document<any, any, UniverseData>,
  characterName: string
): Promise<ICharacter | undefined> => {
  const characterList: ICharacter[] = await getCharacters(universe);
  const character: ICharacter | undefined = characterList.find(
    (character: ICharacter) => character.name === characterName
  );
  return character;
};

export const updateCharacter = async (
  universe: UniverseData & mongoose.Document<any, any, UniverseData>,
  characterName: string,
  newCharacterProperties: Partial<ICharacter>
): Promise<ICharacter> => {
  const characters: ICharacter[] = universe.toObject().characters;
  const updatedCharacters = characters.map((character: ICharacter) =>
    character.name === characterName
      ? {
          ...character,
          ...newCharacterProperties,
        }
      : character
  );
  const index: number = universe.characters.findIndex(
    (character: ICharacter) => character.name === characterName
  );
  universe.characters = updatedCharacters;
  const updatedUniverse = await universe.save();
  return updatedUniverse.toObject().characters[index];
};

export const updateCharacterById = async (
  characterId: mongoose.Types.ObjectId,
  characterName: string,
  newCharacterProperties: Partial<ICharacter>
): Promise<ICharacter | void> => {
  const universe = await Universe.findOne({ 'characters._id': characterId });
  if (!universe) throw new Error('Character not found');
  const characterToUpdate = findCharacterByName(
    universe.toObject().characters,
    characterName
  );
  if (!characterToUpdate) throw new Error('Character not found !');
  const updatedCharacter = await updateCharacter(
    universe,
    characterToUpdate.name,
    newCharacterProperties
  );
  return updatedCharacter;
};

export const deleteCharacter = async (
  universe: UniverseData & mongoose.Document<any, any, UniverseData>,
  characterName: string
): Promise<void> => {
  const updatedCharactersList = universe
    .toObject()
    .characters.filter(
      (character: ICharacter) => character.name !== characterName
    );
  universe.characters = updatedCharactersList;
  await universe.save();
};

const findCharacterByName = (
  characters: ICharacter[],
  characterName: string
): ICharacter | undefined => {
  const character: ICharacter | undefined = characters.find(
    (character: ICharacter) => character.name === characterName
  );
  return character;
};
