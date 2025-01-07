import mongoose from "mongoose";
import { MongoClient } from "mongodb";
import config from "./api/src/config"; // Assurez-vous que le chemin vers votre fichier de configuration est correct
import { createTeam } from "./api/src/common/testUtils/dataFactory"; // Assurez-vous que le chemin vers votre fichier de création d'équipe est correct

const migrate = async () => {
  try {
    // Connect to the database
    await mongoose.connect(config.databaseUrl);
    const db = mongoose.connection;

    // Rename the collection from 'universe' to 'team'
    const oldCollectionName = "universe";
    const newCollectionName = "team";

    const collections = await db.db.listCollections().toArray();
    const collectionNames = collections.map((col) => col.name);

    if (collectionNames.includes(oldCollectionName)) {
      await db.db.collection(oldCollectionName).rename(newCollectionName);
      console.log(
        `Collection renamed from ${oldCollectionName} to ${newCollectionName}`
      );
    } else {
      console.log(`Collection ${oldCollectionName} does not exist`);
    }

    // Insert new data into the 'team' collection
    await createTeam("New Team 1");
    await createTeam("New Team 2");
    console.log("New teams inserted!");

    // Close the database connection
    await mongoose.connection.close();
  } catch (error) {
    console.error("Migration error:", error);
  }
};

migrate();
