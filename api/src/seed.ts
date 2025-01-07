import { GreekGods } from "./apps/characters/characterModel";
import { getTeams } from "./apps/teams/teamsDataManager";
import { createTeam } from "./common/testUtils/dataFactory";

export const seedData = async (): Promise<void> => {
  try {
    const teams = await getTeams();
    const teamCount = teams.length;
    if (teamCount === 0) {
      console.log("Seeding example teams...");
      await createTeam(
        "Power Couples",
        "The key Olympian gods and their family bonds.",
        [GreekGods.DEMETER, GreekGods.HERA, GreekGods.POSEIDON, GreekGods.ZEUS]
      );
      await createTeam(
        "Warriors",
        "Figures associated with war, weapons, and the hunt.",
        [
          GreekGods.ARES,
          GreekGods.ARTEMIS,
          GreekGods.ATHENA,
          GreekGods.HEPHAESTUS,
        ]
      );
      await createTeam(
        "Celestial Beings",
        "Deities tied to the sky, light, and celestial movement.",
        [GreekGods.APOLLO, GreekGods.ARTEMIS, GreekGods.HERMES, GreekGods.ZEUS]
      );
      await createTeam(
        "Underworld Squad",
        "Those with a special connection to the underworld and the life-death cycle.",
        [
          GreekGods.DEMETER,
          GreekGods.DIONYSUS,
          GreekGods.HADES,
          GreekGods.HERMES,
        ]
      );
      await createTeam(
        "Nature's Guardians",
        "Deities connected to nature: the harvest, the hunt, the sea, and the earth’s depths.",
        [
          GreekGods.ARTEMIS,
          GreekGods.DEMETER,
          GreekGods.HADES,
          GreekGods.POSEIDON,
        ]
      );
      await createTeam(
        "Girl Power",
        "Goddesses representing beauty, wisdom, the hunt, and royalty.",
        [
          GreekGods.ARTEMIS,
          GreekGods.ATHENA,
          GreekGods.APHRODITE,
          GreekGods.HERA,
        ]
      );
      console.log("Example teams inserted!");
    } else {
      console.log("teams already exist in the database.");
    }
  } catch (error) {
    console.error("Error seeding data:", error);
  }
};
