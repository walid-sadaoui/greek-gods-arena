import { ICharacter } from "../characters/characterModel";

export interface ITeam {
  _id: string;
  teamName: string;
  description: string;
  characters: ICharacter[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamData {
  _id: string;
  teamName: string;
  characters: ICharacter[];
  createdAt: Date;
  updatedAt: Date;
}
