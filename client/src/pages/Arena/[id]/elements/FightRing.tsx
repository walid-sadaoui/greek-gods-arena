import React from "react";
import { Character } from "models/Character";
import { Fight } from "models/Fight";
import FightTurn from "./FightTurn";
import { FightOpponent } from "./FightRing/FightOpponent";

interface FightRingProps {
  fight: Fight;
  turnCount: number;
}

const FightRing: React.FC<FightRingProps> = ({ fight, turnCount }) => {
  const getRemainingHealth = (
    currentFight: Fight,
    opponent: Character
  ): number => {
    if (turnCount === -1) return opponent.health;

    const defender = currentFight.turns[turnCount].defender;
    if (defender.id === opponent._id) return defender.remainingHealth;
    return currentFight.turns[turnCount].attacker.remainingHealth;
  };

  return (
    <div className="flex flex-col justify-end flex-1 pt-8">
      <FightTurn fight={fight} turnCount={turnCount} />
      <div className="flex items-center justify-around pb-8 gap-36">
        <FightOpponent
          opponent={fight.firstOpponent}
          remainingHealth={getRemainingHealth(fight, fight.firstOpponent)}
          opponentTurn={
            turnCount > -1
              ? fight.firstOpponent._id === fight.turns[turnCount].attacker.id
              : fight.firstOpponent._id === fight.turns[0].attacker.id
          }
          isEnemy={false}
          turn={fight.turns[turnCount]}
        />
        <FightOpponent
          opponent={fight.secondOpponent}
          remainingHealth={getRemainingHealth(fight, fight.secondOpponent)}
          opponentTurn={
            turnCount > -1
              ? fight.secondOpponent._id === fight.turns[turnCount].attacker.id
              : fight.secondOpponent._id === fight.turns[0].attacker.id
          }
          isEnemy={true}
          turn={fight.turns[turnCount]}
        />
      </div>
    </div>
  );
};

export default FightRing;
