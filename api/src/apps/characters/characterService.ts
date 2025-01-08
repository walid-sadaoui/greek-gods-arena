import HttpError from "../../common/error/httpError";
import { CharacterProperties, ICharacter } from "./characterModel";
import * as CharacterDM from "./characterDataManager";
import * as TeamDM from "../teams/teamsDataManager";
import {
  validateCharacterName,
  validateCharacterUpdate,
} from "./characterUtils";

export const createCharacter = async (
  characterName: string,
  teamId: string
): Promise<ICharacter> => {
  try {
    validateCharacterName(characterName);

    const currentTeam = await TeamDM.getTeam(teamId);

    if (currentTeam.characters.length >= 10)
      throw new HttpError(
        400,
        "Create Character Error",
        `You cannot own more than 10 characters !`,
        true
      );

    const characterExists = await CharacterDM.getCharacterByName(
      currentTeam,
      characterName
    );
    if (characterExists)
      throw new HttpError(
        409,
        "Create Character Error",
        `${characterExists.name} is already in you characters list !`,
        true
      );

    const updatedTeam = await CharacterDM.createCharacter(
      currentTeam,
      characterName
    );
    const createdCharacter = await CharacterDM.getCharacterByName(
      updatedTeam,
      characterName
    );
    if (!createdCharacter)
      throw new HttpError(
        400,
        "Create Character Error",
        `There was an error while creating your character ${characterName} !`,
        true
      );

    return createdCharacter;
  } catch (error) {
    throw new HttpError(
      error.statusCode || 500,
      "Create Character Error",
      error.message || "There was a problem creating the new character",
      true
    );
  }
};

export const getCharacters = async (teamId: string): Promise<ICharacter[]> => {
  try {
    const currentTeam = await TeamDM.getTeam(teamId);
    const characters: ICharacter[] = await CharacterDM.getCharacters(
      currentTeam
    );
    return characters;
  } catch (error) {
    throw new HttpError(
      error.statusCode || 500,
      "Get Characters Error",
      error.message || "There was a problem retrieving the characters",
      true
    );
  }
};

export const getCharacter = async (
  teamId: string,
  characterName: string
): Promise<ICharacter> => {
  try {
    validateCharacterName(characterName);

    const currentTeam = await TeamDM.getTeam(teamId);
    const character = await CharacterDM.getCharacterByName(
      currentTeam,
      characterName
    );

    if (!character)
      throw new HttpError(
        404,
        "Create Character Error",
        `Character ${characterName} is not in you characters list !`,
        true
      );

    return character;
  } catch (error) {
    throw new HttpError(
      error.statusCode || 500,
      "Get Character Error",
      error.message || "There was a problem retrieving the characters",
      true
    );
  }
};

export const deleteCharacter = async (
  teamId: string,
  characterName: string
): Promise<void> => {
  try {
    validateCharacterName(characterName);

    const currentTeam = await TeamDM.getTeam(teamId);
    const characterToDelete: ICharacter | undefined =
      await CharacterDM.getCharacterByName(currentTeam, characterName);

    if (!characterToDelete)
      throw new HttpError(
        404,
        "Delete Character Error",
        `Character ${characterName} is not in you characters list !`,
        true
      );

    await CharacterDM.deleteCharacter(currentTeam, characterName);
  } catch (error) {
    throw new HttpError(
      error.statusCode || 500,
      "Delete Characters Error",
      error.message || "There was a problem retrieving the characters",
      true
    );
  }
};

export const updateCharacter = async (
  teamId: string,
  characterName: string,
  newCharacterProperties: CharacterProperties
): Promise<ICharacter> => {
  try {
    validateCharacterName(characterName);

    const currentTeam = await TeamDM.getTeam(teamId);
    const characterToUpdate: ICharacter | undefined =
      await CharacterDM.getCharacterByName(currentTeam, characterName);
    if (!characterToUpdate)
      throw new HttpError(
        404,
        "Update Character Error",
        `Character ${characterName} is not in you characters list !`,
        true
      );

    const updatedCharacterProperties: Omit<
      ICharacter,
      "_id" | "name" | "level"
    > = validateCharacterUpdate(characterToUpdate, newCharacterProperties);
    const updatedCharacter: ICharacter = await CharacterDM.updateCharacter(
      currentTeam,
      characterName,
      updatedCharacterProperties
    );

    return updatedCharacter;
  } catch (error) {
    throw new HttpError(
      error.statusCode || 500,
      "Update Character Error",
      error.message || "There was a problem updating the character",
      true
    );
  }
};
