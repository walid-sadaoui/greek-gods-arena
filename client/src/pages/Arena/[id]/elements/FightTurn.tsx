import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Fight } from "models/Fight";
import { useTextDisplay } from "shared/context/TextDisplay";
import Button, { Variants } from "components/common/Button";

interface FightTurnProps {
  fight: Fight;
  turnCount: number;
  onNextTurn: React.MouseEventHandler<HTMLButtonElement>;
}
const FightTurn: React.FC<FightTurnProps> = ({
  fight,
  turnCount,
  onNextTurn,
}) => {
  const { turnStatus, setTurnStatus } = useTextDisplay();

  useEffect(() => {
    const description = getTurnDescription();
    setTurnStatus({ description, currentIndex: 0, displayedText: "" });
  }, [turnCount]);

  const getAttacker = (): string => {
    if (fight.turns[turnCount].attacker.id === fight.firstOpponent._id) {
      return `${fight.firstOpponent.name} (You)`;
    } else {
      return fight.secondOpponent.name;
    }
  };

  const getDefender = (): string => {
    if (fight.turns[turnCount].defender.id === fight.firstOpponent._id) {
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

  const getTurnDescription = (): string[] => {
    const turnDescription = [];
    if (turnCount === -1)
      return [
        `Prepare yourself for an epic battle! The mighty ${fight.firstOpponent.name} takes the first strike. Let the clash of the gods begin!`,
      ];

    const ATTACKER = `${getAttacker()} unleashes a powerful strike!`;
    const ATTACK_RESULT = `${
      fight.turns[turnCount].attackSuccess
        ? `The attack hits with divine force!`
        : `The attack misses, thwarted by ${getDefender()}!`
    }`;
    const FIGHT_END = `The battle is over, ${getLoser()} has fallen!`;
    const FIGHT_RESULT = `Victory belongs to ${getWinner()}, champion of the Gods!`;

    turnDescription.push(ATTACKER);
    turnDescription.push(ATTACK_RESULT);
    if (fight.turns[turnCount].defender.remainingHealth === 0)
      turnDescription.push(`${FIGHT_END} ${FIGHT_RESULT}`);
    return turnDescription;
  };

  return (
    <motion.div
      initial={{
        scale: 0,
      }}
      animate={{
        scale: 1,
        transition: {
          duration: 1,
        },
      }}
      className="absolute top-12 flex flex-col self-center justify-center items-center px-4 pt-12 pb-4 mb-4 text-xl border-4 border-black bg-amber-200 [width:_clamp(480px,60%,1024px)]"
    >
      <div className="absolute top-0 w-32 p-4 text-[clamp(0.75rem,1rem,1.25rem)] text-center transform -translate-x-1/2 -translate-y-1/2 border-4 border-black rounded-container font-greek bg-amber-200 left-1/2">
        {`${turnCount + 1} / ${fight.turns.length}`}
      </div>
      <p className="text-[clamp(0.75rem,1rem,3rem)] pb-4">
        {turnStatus.displayedText}
      </p>
      <Button
        onClick={onNextTurn}
        variant={Variants.DEFAULT}
        className="font-greek"
      >
        {turnCount === -1
          ? "Begin Fight"
          : turnCount === fight.turns.length - 1
            ? "Replay"
            : "Next Turn"}
      </Button>
    </motion.div>
  );
};

export default FightTurn;
