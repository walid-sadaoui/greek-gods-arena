import * as TeamDM from "../../apps/teams/teamsDataManager";
import * as CharacterDM from "../../apps/characters/characterDataManager";
import * as FightUtils from "../../apps/fights/fightUtils";
import { IFight } from "../../apps/fights/fightModel";
import Team from "../../apps/teams/teamsSchema";
import { ITeam } from "../../apps/teams/teamsModel";
import { GreekGods, ICharacter } from "../../apps/characters/characterModel";
import Character from "../../apps/characters/characterSchema";

// create team
export const createTeam = async (
  teamName: string,
  description: string,
  gods: GreekGods[]
): Promise<ITeam> => {
  try {
    const characters: ICharacter[] = gods.map((greekGod: GreekGods) => {
      return new Character({ name: greekGod });
    });
    let newTeam = new Team({
      teamName,
      description,
      characters,
    });
    newTeam = await newTeam.save();
    return newTeam;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateCharacter = async (
  teamId: string,
  characterName: string
): Promise<ICharacter> => {
  try {
    const currentTeam = await TeamDM.getTeam(teamId);

    const updatedCharacterProperties = {
      skillPoints: 42,
      health: 20,
      attack: 14,
      defense: 12,
      magik: 2,
      level: 1,
    };
    const updatedCharacter = await CharacterDM.updateCharacter(
      currentTeam,
      characterName,
      updatedCharacterProperties
    );
    return updatedCharacter;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateCharacterProperties = async (
  teamId: string,
  characterName: string,
  newCharacterProperties: Partial<ICharacter>
): Promise<ICharacter> => {
  try {
    const currentTeam = await TeamDM.getTeam(teamId);
    const updatedCharacter = await CharacterDM.updateCharacter(
      currentTeam,
      characterName,
      newCharacterProperties
    );
    return updatedCharacter;
  } catch (error) {
    throw new Error(error);
  }
};

export const newFight = async (
  firstTeamId: string,
  secondTeamId: string
): Promise<IFight> => {
  try {
    const firstTeam = await TeamDM.getTeam(firstTeamId);
    const secondTeam = await TeamDM.getTeam(secondTeamId);

    const fight = await FightUtils.launchFight(
      firstTeam.characters[0],
      secondTeam.characters[1]
    );
    return fight;
  } catch (error) {
    throw new Error(error);
  }
};
