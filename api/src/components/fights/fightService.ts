import * as FightDM from './fightDataManager';
import * as UniverseDM from '../universes/universesDataManager';
import * as CharacterDM from '../users/characters/characterDataManager';
import HttpError from '../../common/error/httpError';
import { ICharacter } from '../users/characters/characterModel';
import { IFight } from './fightModel';
import * as FightUtils from './fightUtils';
import { validateCharacterName } from '../users/characters/characterUtils';

export const newFight = async (
  universeId: string,
  characterName: string
): Promise<IFight> => {
  try {
    validateCharacterName(characterName);
    const currentUniverse = await UniverseDM.getUniverse(universeId);
    const firstOpponent = await CharacterDM.getCharacterByName(
      currentUniverse,
      characterName
    );
    if (!firstOpponent)
      throw new HttpError(
        404,
        'Fight Error',
        `Character ${characterName} is not in you characters list !`,
        true
      );

    // TODO check currentUser character authorized to fight
    // const loser = await Fight.findOne({
    //   loser: firstOpponent._id,
    //   createdAt: { $gt: new Date(Date.now() - 3600000) },
    // });
    // if (loser)
    //   throw new HttpError(
    //     400,
    //     'Fight Error',
    //     `Character ${characterName} is not authorized to fight because it lost a fight less than an hour ago !`,
    //     true
    //   );

    const secondOpponent: ICharacter = await FightUtils.findOpponent(
      currentUniverse._id,
      firstOpponent
    );
    const fight = await FightUtils.launchFight(firstOpponent, secondOpponent);

    return fight;
  } catch (error) {
    throw new HttpError(
      error.statusCode || 500,
      'Fight Error',
      error.message || 'There was an error processing the fight',
      true
    );
  }
};

export const getFight = async (fightId: string): Promise<IFight> => {
  try {
    const fight = await FightDM.getFight(fightId);
    if (!fight)
      throw new HttpError(404, 'Fight Error', 'Fight not found !', true);
    return fight;
  } catch (error) {
    throw new HttpError(
      error.statusCode || 500,
      'Fight Error',
      error.message || 'There was an error retreiving the fight',
      true
    );
  }
};
