import React from 'react';
import Icon, { IconName } from 'components/common/Icon';

enum HealthStatusColors {
  GOOD = 'bg-green-700',
  MEDIUM = 'bg-yellow-600',
  BAD = 'bg-red-700',
}

export const HealthBar: React.FC<{
  max: number;
  skillValue: number;
  isEnemy: boolean;
  name: string;
}> = ({ max, skillValue, isEnemy, name }) => {
  const [progressColor, setProgressColor] = React.useState(
    HealthStatusColors.GOOD
  );

  const handleProgressColor = (): void => {
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
    <div className={`flex flex-col justify-center w-72`}>
      <span
        className={`${
          isEnemy ? 'self-end mr-16' : 'self-start ml-16'
        } rounded-container text-4xl text-white  text-outline font-greek -mb-6`}
      >
        {name}
      </span>
      <div
        className={`flex w-full items-center ${
          isEnemy ? 'flex-row-reverse' : ''
        }`}
      >
        <Icon
          icon={IconName.HEART}
          className={`z-10 ${
            isEnemy ? '-ml-8' : '-mr-8'
          } text-red-500 stroke-1 text-8xl stroke-black`}
        />
        <div
          className={`flex w-full bg-gray-600 border-4 border-black ${
            isEnemy ? 'justify-end' : ''
          }`}
        >
          <div
            className={`${
              skillValue !== 0 ? 'opacity-1' : 'opacity-0'
            } text-xs leading-none text-center text-white ${progressColor} transition-all delay-1000 duration-300 ease-in-out py-4`}
            style={{
              width: `${(skillValue * 100) / max}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};
