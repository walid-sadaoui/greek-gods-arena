import mongoose from 'mongoose';

export interface ICharacter {
  _id: mongoose.Types.ObjectId;
  name: string;
  skillPoints: number;
  health: number;
  attack: number;
  defense: number;
  magik: number;
  level: number;
}

export interface CharacterData {
  name: string;
  skillPoints: number;
  health: number;
  attack: number;
  defense: number;
  magik: number;
  level: number;
}

export interface CharacterProperties {
  health: number;
  attack: number;
  defense: number;
  magik: number;
}

export enum GreekGods {
  APHRODITE = 'APHRODITE',
  APOLLO = 'APOLLO',
  ARES = 'ARES',
  ARTEMIS = 'ARTEMIS',
  ATHENA = 'ATHENA',
  DEMETER = 'DEMETER',
  DIONYSUS = 'DIONYSUS',
  HADES = 'HADES',
  HEPHAESTUS = 'HEPHAESTUS',
  HERA = 'HERA',
  HERMES = 'HERMES',
  POSEIDON = 'POSEIDON',
  ZEUS = 'ZEUS',
}

export const GreekGodsArray = Object.values(GreekGods);
