import React from "react";
import Icon, { IconName } from "components/common/Icon";
import useScreenSize from "shared/hooks/useScreenSize";

enum HealthStatusColors {
  GOOD = "bg-green-700",
  MEDIUM = "bg-orange-500",
  BAD = "bg-red-700",
}

export const HealthBar: React.FC<{
  max: number;
  skillValue: number;
  isEnemy: boolean;
  name: string;
  teamName: string;
}> = ({ max, skillValue, isEnemy, name, teamName }) => {
  const [progressColor, setProgressColor] = React.useState(
    HealthStatusColors.GOOD
  );
  const { isLargeScreen } = useScreenSize();

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
    <div className={`flex flex-col justify-center w-96`}>
      <div
        className={`${isEnemy ? "self-end text-right mr-16" : "self-start ml-16"}
        ${isLargeScreen ? "text-4xl" : "text-3xl"}
        rounded-container flex flex-col text-white font-black -mb-6`}
      >
        <span className="text-outline">{name}</span>
        <span className={`font-greek font-black text-gray-800`}>
          {teamName}
        </span>
      </div>
      <div
        className={`flex w-full items-center ${
          isEnemy ? "flex-row-reverse" : ""
        }`}
      >
        <Icon
          icon={IconName.HEART}
          className={`z-10 ${
            isEnemy ? "-ml-8" : "-mr-8"
          } text-red-500 stroke-1 text-8xl stroke-black`}
        />
        <div
          className={`flex w-full backdrop-blur-md backdrop-brightness-105 border-4 border-black ${
            isEnemy ? "justify-end" : ""
          }`}
        >
          <div
            className={`text-xs leading-none text-center text-white ${progressColor} transition-all delay-1000 duration-300 ease-in-out py-4`}
            style={{
              width: `${(skillValue * 100) / max}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};
