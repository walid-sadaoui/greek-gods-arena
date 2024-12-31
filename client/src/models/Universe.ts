import { Character } from "./Character";

export interface Universe {
  _id: string;
  universeName: string;
  characters: Character[];
  createdAt: string;
  updatedAt: string;
}
