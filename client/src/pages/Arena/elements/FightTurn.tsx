import React from "react";
import { Fight } from "models/Fight";

interface FightTurnProps {
  fight: Fight;
  turnCount: number;
}
const FightTurn: React.FC<FightTurnProps> = ({ fight, turnCount }) => {
  const getAttacker = (): string => {
    if (fight.turns[turnCount].attacker.id === fight.firstOpponent._id) {
      return `${fight.firstOpponent.name} (You)`;
    } else {
      return fight.secondOpponent.name;
    }
  };

  const getWinner = (): string => {
    if (fight.winner === fight.firstOpponent._id) {
      return `${fight.firstOpponent.name} (You)`;
    } else {
      return fight.secondOpponent.name;
    }
  };

  const getLoser = (): string => {
    if (fight.loser === fight.firstOpponent._id) {
      return `${fight.firstOpponent.name} (You)`;
    } else {
      return fight.secondOpponent.name;
    }
  };

  const getTurnDescription = (): string => {
    if (turnCount === -1)
      return `Click on Next Turn to process the fight ! Your God ${fight.firstOpponent.name} goes first !`;

    const ATTACKER = `${getAttacker()} attacks !`;
    const ATTACK_RESULT = `${
      fight.turns[turnCount].attackSuccess
        ? `Attack landed !`
        : `Attack failed !`
    }`;
    const FIGHT_END = `The fight is over, ${getLoser()} is dead !`;
    const FIGHT_RESULT = `The winner is ${getWinner()} !`;

    return `${ATTACKER} ${ATTACK_RESULT} ${
      fight.turns[turnCount].defender.remainingHealth === 0
        ? `${FIGHT_END} ${FIGHT_RESULT}`
        : ""
    }`;
  };

  return (
    <div className="relative flex flex-col self-center justify-center px-4 pt-12 pb-4 mx-auto mb-4 text-xl border-4 border-black bg-amber-200 w-120">
      <div className="absolute top-0 w-32 p-4 text-xl text-center transform -translate-x-1/2 -translate-y-1/2 border-4 border-black rounded-container font-greek bg-amber-200 left-1/2">
        {`${turnCount + 1} / ${fight.turns.length}`}
      </div>
      <p>{getTurnDescription()}</p>
    </div>
  );
};

export default FightTurn;
