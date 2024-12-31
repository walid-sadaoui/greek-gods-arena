import { getUniverses } from "./apps/universes/universesDataManager";
import { createUniverse } from "./common/testUtils/dataFactory";

export const seedData = async (): Promise<void> => {
  try {
    const universes = await getUniverses();
    const universeCount = universes.length;
    if (universeCount === 0) {
      console.log("Seeding example universes...");
      await createUniverse("Universe-1");
      await createUniverse("Universe-2");
      console.log("Example universes inserted!");
    } else {
      console.log("universes already exist in the database.");
    }
  } catch (error) {
    console.error("Error seeding data:", error);
  }
};
