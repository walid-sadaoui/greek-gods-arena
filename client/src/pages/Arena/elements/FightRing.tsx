import React, { useEffect, useRef, useState, forwardRef } from 'react';
import { motion } from 'framer-motion';
import Icon, { IconName } from 'components/common/Icon';
import { Character } from 'models/Character';
import { Fight } from 'models/Fight';

enum HealthStatusColors {
  GOOD = 'bg-green-700',
  MEDIUM = 'bg-yellow-600',
  BAD = 'bg-red-700',
}

const HealthBar: React.FC<{ max: number; skillValue: number }> = ({
  max,
  skillValue,
}) => {
  const [progressColor, setProgressColor] = React.useState(
    HealthStatusColors.GOOD
  );

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleProgressColor = () => {
    if (skillValue / max > 0.5) {
      setProgressColor(HealthStatusColors.GOOD);
    } else if (skillValue / max < 0.2) {
      setProgressColor(HealthStatusColors.BAD);
    } else {
      setProgressColor(HealthStatusColors.MEDIUM);
    }
  };

  React.useEffect(() => {
    handleProgressColor();
  }, [skillValue]);

  return (
    <div
      className='w-full bg-gray-400 border-4 border-black'
      role='progressbar'
    >
      <div
        className={`py-1 text-xs leading-none text-center text-white ${progressColor}`}
        style={{
          width: `${(skillValue * 100) / max}%`,
        }}
      >
        <span>{skillValue}</span>
      </div>
    </div>
  );
};

export const SkillIconValue: React.FC<{
  iconName: IconName;
  skillValue: number;
  color?: string;
}> = ({ iconName, skillValue, color }) => {
  return (
    <div className={`flex mr-2 ${color && `text-${color}`}`}>
      <Icon icon={iconName} />
      <span>{skillValue}</span>
    </div>
  );
};

interface FightOpponentProps {
  opponent: Character;
  remainingHealth: number;
  opponentTurn: boolean;
  opponentPosition: { x: number; y: number };
}

// const ArrowAnimation = ({ remainingHealth }) => {
//   // Starting position for the throwing animation
//   const startX = 0; // Start position (left)
//   const startY = 0; // Start position (top)

//   // Target position for the throwing animation (right side of the screen)
//   const endX = 500; // Target position (right)
//   const endY = -100; // Target position (vertical offset, arc effect)

//   return (
//     <motion.div
//       initial={{
//         x: startX,
//         y: startY,
//         rotate: 0,
//         opacity: 1,
//       }}
//       animate={{
//         x: remainingHealth === 0 ? endX : startX, // Only animate when health is 0
//         y: remainingHealth === 0 ? endY : startY,
//         rotate: remainingHealth === 0 ? 360 : 0, // Full rotation as if the arrow is spinning
//         opacity: remainingHealth === 0 ? 1 : 0, // Arrow is visible when thrown
//         transition: {
//           duration: 1.5, // Duration of the throw
//           ease: 'easeOut', // Easing for the motion
//         },
//       }}
//       className={`w-full h-full bg-center bg-no-repeat bg-contain ${
//         remainingHealth === 0 ? 'transform filter grayscale' : ''
//       }`}
//       style={{
//         backgroundImage: `url(${`/greek-gods/ARTEMIS.svg`})`,
//       }}
//     />
//   );
// };

const FightOpponent = forwardRef<HTMLDivElement, FightOpponentProps>(
  (
    { opponent, remainingHealth, opponentTurn, opponentPosition },
    opponentRef
  ) => {
    const variants = {
      hidden: { scale: 1 },
      visible: {
        scale: 1.2,
        transition: { duration: 1, yoyo: Infinity },
      },
    };

    useEffect(() => {
      console.error({ opponent: opponent.name });
      console.error({ opponentPosition });
    }, [opponentPosition]);

    return (
      <>
        <div className='flex flex-col items-center justify-end w-full h-2/3'>
          <div
            className={`flex flex-col p-4 mb-4 text-white bg-black bg-opacity-75 rounded-container ${
              opponentTurn && 'ring-4 ring-yellow-200'
            }`}
          >
            <div className='flex pb-2 font-greek'>
              {opponentTurn && (
                <Icon icon='chevron-right' className='text-yellow-200' />
              )}
              <p>{opponent.name}</p>
            </div>
            <div className='flex pb-2'>
              <motion.div
                initial='hidden'
                animate='visible'
                variants={variants}
              >
                <Icon icon='heart' className='mr-2 text-red-500' />
              </motion.div>
              <HealthBar max={opponent.health} skillValue={remainingHealth} />
            </div>
            <div className='flex'>
              <SkillIconValue
                iconName={IconName.SWORD}
                skillValue={opponent.attack}
              />
              <SkillIconValue
                iconName={IconName.SHIELD}
                skillValue={opponent.defense}
              />
              <SkillIconValue
                iconName={IconName.MAGIC}
                skillValue={opponent.magik}
              />
            </div>
          </div>
          <motion.div
            animate={{
              rotate: remainingHealth === 0 ? -90 : 0,
              x: opponentTurn ? opponentPosition.x : 0, // Move the element 100px to the right during opponent's turn
              transition: {
                duration: opponentTurn ? 2 : 1, // 2 seconds if it's opponent's turn, otherwise 1 second
                repeat: opponentTurn ? 1 : 0, // If it's opponent's turn, rotate once and return
                repeatType: opponentTurn ? 'mirror' : undefined, // Ensure it goes back to 0 rotation
                ease: opponentTurn ? 'easeInOut' : 'linear', // Smooth transition for opponent turn
              },
            }}
            className={`w-full h-full bg-center bg-no-repeat bg-contain ${
              remainingHealth === 0 && 'transform filter grayscale'
            }`}
            style={{
              backgroundImage: `url(${`/greek-gods/${opponent.name}.svg`})`,
              transformOrigin: 'center',
            }}
            ref={opponentRef}
          ></motion.div>
        </div>
      </>
    );
  }
);

interface FightRingProps {
  fight: Fight;
  turnCount: number;
}

const FightRing: React.FC<FightRingProps> = ({ fight, turnCount }) => {
  const firstOpponentRef = useRef<HTMLDivElement | null>(null); // Use HTMLDivElement for div element
  const [firstOppTargetPosition, setFirstOppTargetPosition] = useState({
    x: 0,
    y: 0,
  });
  const secondOpponentRef = useRef<HTMLDivElement | null>(null); // Use HTMLDivElement for div element
  const [secondOppTargetPosition, setSecondOppTargetPosition] = useState({
    x: 0,
    y: 0,
  });

  // Calculate target's position when the component mounts
  useEffect(() => {
    if (secondOpponentRef.current) {
      const rect = secondOpponentRef.current.getBoundingClientRect();
      setFirstOppTargetPosition({ x: rect.left, y: rect.top });
    }
    if (firstOpponentRef.current) {
      const rect = firstOpponentRef.current.getBoundingClientRect();
      setSecondOppTargetPosition({ x: rect.left, y: rect.top });
    }
  }, []);

  useEffect(() => {
    console.log({ firstOppTargetPosition });
    console.log({ secondOppTargetPosition });
  }, [firstOppTargetPosition, secondOppTargetPosition]);

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
    <div className='flex items-end flex-1 p-4'>
      <FightOpponent
        opponent={fight.firstOpponent}
        remainingHealth={getRemainingHealth(fight, fight.firstOpponent)}
        opponentTurn={
          turnCount !== fight.turns.length - 1 &&
          fight.firstOpponent._id === fight.turns[turnCount + 1].attacker.id
        }
        opponentPosition={secondOppTargetPosition}
        ref={secondOpponentRef}
      />
      <FightOpponent
        opponent={fight.secondOpponent}
        opponentPosition={firstOppTargetPosition}
        remainingHealth={getRemainingHealth(fight, fight.secondOpponent)}
        opponentTurn={
          turnCount !== fight.turns.length - 1 &&
          fight.secondOpponent._id === fight.turns[turnCount + 1].attacker.id
        }
        ref={firstOpponentRef}
      />
    </div>
  );
};

export default FightRing;
