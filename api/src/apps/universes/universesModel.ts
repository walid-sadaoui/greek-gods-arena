import { ICharacter } from "../characters/characterModel";

export interface IUniverse {
  _id: string;
  universeName: string;
  characters: ICharacter[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UniverseData {
  _id: string;
  universeName: string;
  characters: ICharacter[];
  createdAt: Date;
  updatedAt: Date;
}
