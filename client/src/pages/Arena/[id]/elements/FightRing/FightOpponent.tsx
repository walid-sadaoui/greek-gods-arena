import React from "react";
import { Variants, motion } from "framer-motion";
import { Character } from "models/Character";
import { Turn } from "models/Turn";
import { HealthBar } from "./HealthBar";
import { SkillIconValue } from "./SkillIconValue";
import { IconName } from "components/common/Icon";
import useScreenSize from "shared/hooks/useScreenSize";
import { useTeam } from "shared/context/TeamContext";
import { useTextDisplay } from "shared/context/TextDisplay";

interface FightOpponentProps {
  opponent: Character;
  remainingHealth: number;
  opponentTurn: boolean;
  isEnemy: boolean;
  turn: Turn;
}

export const FightOpponent: React.FC<FightOpponentProps> = ({
  opponent,
  remainingHealth,
  opponentTurn,
  isEnemy,
  turn,
}) => {
  const { teams } = useTeam();
  const { isLargeScreen } = useScreenSize();
  const { showNextText } = useTextDisplay();

  const opponentVariants: Variants = {
    initial: {
      scale: 1,
      opacity: 1,
      x: 0,
      scaleX: isEnemy ? -1 : 1,
      originY: 1,
      clipPath: "inset(0% 0% 0% 0%)",
    },
    start: {
      scale: 0.98,
      transition: { duration: 1, yoyo: Infinity },
    },
    attack: {
      x:
        opponentTurn && turn
          ? isEnemy
            ? [0, 40, -80, 0]
            : [0, -40, 80, 0]
          : 0,
      transition: {
        duration: 1,
        delay: 0.5,
        times: [0, 0.6, 0.75, 1],
      },
    },
    damage: {
      opacity:
        turn !== undefined &&
        turn.attackSuccess &&
        turn.attacker.id !== opponent._id
          ? [1, 0.5, 1]
          : 1,
      fill: "#FF0000",
      transition: {
        duration: 0.25,
        delay: 1.5,
        repeat: 3,
        repeatType: "loop",
      },
    },
    death: {
      opacity: remainingHealth === 0 ? 0 : 1, // Fade out
      y: remainingHealth === 0 ? (isLargeScreen ? 480 : 320) : 0, // Move downward by 200px (adjust as needed)
      filter: remainingHealth === 0 ? "grayscale(100%)" : "grayscale(0%)",
      clipPath:
        remainingHealth === 0 ? "inset(0% 0% 100% 0%)" : "inset(0% 0% 0% 0%)",
      transition: {
        duration: 3,
        delay: 2.5,
        ease: "easeIn",
      },
    },
  };

  const getTeamName = (opponent: Character): string => {
    for (const team of teams) {
      if (team.characters.some((character) => character._id === opponent._id)) {
        return team.teamName;
      }
    }
    throw new Error("Team not found for the given character");
  };

  return (
    <div className={`flex flex-col p-4 ${isEnemy ? "items-end" : ""}`}>
      {/* <div className="fixed inset-0 opacity-0 z-50 bg-black"></div>{" "} */}
      <HealthBar
        max={opponent.health}
        skillValue={remainingHealth}
        isEnemy={isEnemy}
        name={opponent.name}
        teamName={getTeamName(opponent)}
      />
      <div className={`flex gap-4 ${isEnemy ? "flex-row-reverse" : ""}`}>
        <div className="flex flex-col gap-2">
          <SkillIconValue
            iconName={IconName.SWORD}
            skillValue={opponent.attack}
            isEnemy={isEnemy}
          />
          <SkillIconValue
            iconName={IconName.SHIELD}
            skillValue={opponent.defense}
            isEnemy={isEnemy}
          />
          <SkillIconValue
            iconName={IconName.MAGIC}
            skillValue={opponent.magik}
            isEnemy={isEnemy}
          />
        </div>
        <motion.img
          variants={opponentVariants}
          initial={"initial"}
          animate={["start", "attack", "death", "damage"]}
          onAnimationComplete={(definition) => {
            // console.error({ definition });
            // console.error({ remainingHealth });
            if (definition === "attack" && turn && opponentTurn === true) {
              // console.error({ definition });
              console.error("Attack");
              showNextText();
            }
            console.error({ remainingHealth });
            if (definition === "death" && remainingHealth === 0) {
              // console.error({ definition });
              console.error("Death");
              showNextText();
            }
          }}
          src={`/greek-gods/${opponent.name}.svg`}
          className={`${isLargeScreen ? "h-[30rem]" : "h-[20rem]"}`}
          alt={opponent.name}
        ></motion.img>
      </div>
    </div>
  );
};
