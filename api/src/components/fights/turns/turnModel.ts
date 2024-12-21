import mongoose from 'mongoose';

export interface ITurn {
  count: number;
  attacker: IAttacker;
  defender: IDefender;
  damages: number;
  attackSuccess: boolean;
}

export interface IAttacker {
  id: mongoose.Types.ObjectId;
  attackValue: number;
  remainingHealth: number;
}

export interface IDefender {
  id: mongoose.Types.ObjectId;
  defenseSkillPoints: number;
  remainingHealth: number;
}
