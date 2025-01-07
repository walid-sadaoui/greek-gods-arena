import { Character } from "./Character";

export interface Team {
  _id: string;
  teamName: string;
  description: string;
  characters: Character[];
  createdAt: string;
  updatedAt: string;
}
