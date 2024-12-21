import { ICharacter } from 'components/users/characters/characterModel';
import mongoose from 'mongoose';
import { IFight } from './fightModel';
import Fight from './fightSchema';
import HttpError from '../../common/error/httpError';

export const createFight = async (
  firstOpponent: ICharacter,
  secondOpponent: ICharacter
): Promise<IFight & mongoose.Document<any, any, IFight>> => {
  const newFight = new Fight({ firstOpponent, secondOpponent });
  await newFight.save();
  return newFight;
};

export const getFight = async (
  fightId: string
): Promise<IFight & mongoose.Document<any, any, IFight>> => {
  const fight = await Fight.findOne({ _id: fightId });
  if (!fight)
    throw new HttpError(404, 'Get Fight error', 'Fight not found', true);
  return fight;
};
