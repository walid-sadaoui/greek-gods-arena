import React, { useEffect } from "react";
import { Character } from "models/Character";
import { Fight } from "models/Fight";
import { FightOpponent } from "./FightRing/FightOpponent";
import { useAudio } from "shared/context/audioContext";

interface FightRingProps {
  fight: Fight;
  turnCount: number;
}

const FightRing: React.FC<FightRingProps> = ({ fight, turnCount }) => {
  const { isMuted, toggleMute } = useAudio();
  const getRemainingHealth = (
    currentFight: Fight,
    opponent: Character
  ): number => {
    if (turnCount === -1) return opponent.health;

    const defender = currentFight.turns[turnCount].defender;
    if (defender.id === opponent._id) return defender.remainingHealth;
    return currentFight.turns[turnCount].attacker.remainingHealth;
  };

  useEffect(() => {
    if (!isMuted) toggleMute();
  }, []);

  return (
    <div className="flex flex-col justify-end flex-1 pt-8">
      <div className="flex items-center justify-around gap-36">
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
