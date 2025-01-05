import * as FightDM from "./fightDataManager";
import * as TeamDM from "../teams/teamsDataManager";
import * as CharacterDM from "../characters/characterDataManager";
import HttpError from "../../common/error/httpError";
import { ICharacter } from "../characters/characterModel";
import { IFight } from "./fightModel";
import * as FightUtils from "./fightUtils";
import { validateCharacterName } from "../characters/characterUtils";

export const newFight = async (
  teamId: string,
  characterName: string
): Promise<IFight> => {
  try {
    validateCharacterName(characterName);
    const currentTeam = await TeamDM.getTeam(teamId);
    const firstOpponent = await CharacterDM.getCharacterByName(
      currentTeam,
      characterName
    );
    if (!firstOpponent)
      throw new HttpError(
        404,
        "Fight Error",
        `Character ${characterName} is not in you characters list !`,
        true
      );

    const secondOpponent: ICharacter = await FightUtils.findOpponent(
      currentTeam._id,
      firstOpponent
    );
    const fight = await FightUtils.launchFight(firstOpponent, secondOpponent);

    return fight;
  } catch (error) {
    throw new HttpError(
      error.statusCode || 500,
      "Fight Error",
      error.message || "There was an error processing the fight",
      true
    );
  }
};

export const getFight = async (fightId: string): Promise<IFight> => {
  try {
    const fight = await FightDM.getFight(fightId);
    if (!fight)
      throw new HttpError(404, "Fight Error", "Fight not found !", true);
    return fight;
  } catch (error) {
    throw new HttpError(
      error.statusCode || 500,
      "Fight Error",
      error.message || "There was an error retreiving the fight",
      true
    );
  }
};
