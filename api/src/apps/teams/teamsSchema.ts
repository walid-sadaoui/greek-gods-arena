import mongoose from "mongoose";
import { ITeam } from "./teamsModel";
import { characterSchema } from "../characters/characterSchema";

const { Schema } = mongoose;

const teamSchema = new Schema<ITeam>(
  {
    teamName: {
      type: String,
      unique: [true, "This Team Name is already used"],
    },
    description: {
      type: String,
    },
    characters: [characterSchema],
  },
  { timestamps: true }
);

const Team = mongoose.model<ITeam>("Team", teamSchema);
export default Team;
