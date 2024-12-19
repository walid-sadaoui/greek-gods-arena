import * as UniverseDM from './universesDataManager';

export const getUniverse = async (universeId: string) => {
  const universe = await UniverseDM.getUniverse(universeId);
  return universe;
};

export const getUniverses = async () => {
  const universe = await UniverseDM.getUniverses();
  return universe;
};
