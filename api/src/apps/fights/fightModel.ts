import { ICharacter } from "../characters/characterModel";
import { ITurn } from "./turns/turnModel";
import mongoose from "mongoose";

export interface IFight {
  _id: mongoose.Types.ObjectId;
  firstOpponent: ICharacter;
  secondOpponent: ICharacter;
  finished: boolean;
  winner?: mongoose.Types.ObjectId | null | undefined;
  loser?: mongoose.Types.ObjectId | null | undefined;
  turns: ITurn[];
  createdAt: Date;
  updatedAt: Date;
}
