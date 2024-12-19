import mongoose from 'mongoose';
import HttpError from '../../common/error/httpError';
import { UniverseData } from './universesModel';
import Universe from './universesSchema';

export const getUniverse = async (
  universeId: string
): Promise<UniverseData & mongoose.Document<any, any, UniverseData>> => {
  const universe = await Universe.findOne({ _id: universeId });
  if (!universe)
    throw new HttpError(404, 'Get Universe error', 'Universe not found', true);
  return universe;
};

export const getUniverses = async (): Promise<
  UniverseData[] & mongoose.Document<any, any, UniverseData>[]
> => {
  const universes = await Universe.find();
  // if (universes.length == 0)
  //   throw new HttpError(404, 'Get Universe error', 'Universe not found', true);
  return universes;
};
