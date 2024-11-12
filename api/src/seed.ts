import { getUniverses } from './components/universes/universesDataManager';
import { createUniverse } from './common/testUtils/dataFactory';

export const seedData = async (): Promise<void> => {
  try {
    // Check if the database already has data
    const universes = await getUniverses();
    const universeCount = universes.length;
    if (universeCount === 0) {
      console.log('Seeding example users...');
      await createUniverse('Universe-1');
      await createUniverse('Universe-2');
      console.log('Example users inserted!');
    } else {
      console.log('Users already exist in the database.');
    }
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};
