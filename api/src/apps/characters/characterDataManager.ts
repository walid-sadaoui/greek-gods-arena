import mongoose from "mongoose";
import { ICharacter } from "./characterModel";
import Character from "./characterSchema";
import { TeamData } from "../teams/teamsModel";
import Team from "../teams/teamsSchema";

export const createCharacter = async (
  team: TeamData & mongoose.Document<any, any, TeamData>,
  characterName: string
): Promise<TeamData & mongoose.Document<any, any, TeamData>> => {
  const newCharacter = new Character({ name: characterName });
  team.characters.push(newCharacter);
  const createdTeam = await team.save();
  return createdTeam;
};

export const getCharacters = async (
  team: TeamData & mongoose.Document<any, any, TeamData>
): Promise<ICharacter[]> => {
  const characterList: ICharacter[] = team.toObject().characters;
  return characterList;
};

export const getCharacterByName = async (
  team: TeamData & mongoose.Document<any, any, TeamData>,
  characterName: string
): Promise<ICharacter | undefined> => {
  const characterList: ICharacter[] = await getCharacters(team);
  const character: ICharacter | undefined = characterList.find(
    (character: ICharacter) => character.name === characterName
  );
  return character;
};

export const updateCharacter = async (
  team: TeamData & mongoose.Document<any, any, TeamData>,
  characterName: string,
  newCharacterProperties: Partial<ICharacter>
): Promise<ICharacter> => {
  const characters: ICharacter[] = team.toObject().characters;
  const updatedCharacters = characters.map((character: ICharacter) =>
    character.name === characterName
      ? {
          ...character,
          ...newCharacterProperties,
        }
      : character
  );
  const index: number = team.characters.findIndex(
    (character: ICharacter) => character.name === characterName
  );
  team.characters = updatedCharacters;
  const updatedTeam = await team.save();
  return updatedTeam.toObject().characters[index];
};

export const updateCharacterById = async (
  characterId: mongoose.Types.ObjectId,
  characterName: string,
  newCharacterProperties: Partial<ICharacter>
): Promise<ICharacter | void> => {
  const team = await Team.findOne({ "characters._id": characterId });
  if (!team) throw new Error("Character not found");
  const characterToUpdate = findCharacterByName(
    team.toObject().characters,
    characterName
  );
  if (!characterToUpdate) throw new Error("Character not found !");
  const updatedCharacter = await updateCharacter(
    team,
    characterToUpdate.name,
    newCharacterProperties
  );
  return updatedCharacter;
};

export const deleteCharacter = async (
  team: TeamData & mongoose.Document<any, any, TeamData>,
  characterName: string
): Promise<void> => {
  const updatedCharactersList = team
    .toObject()
    .characters.filter(
      (character: ICharacter) => character.name !== characterName
    );
  team.characters = updatedCharactersList;
  await team.save();
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
