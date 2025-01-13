import React from "react";
import Icon, { IconName } from "components/common/Icon";
import useScreenSize from "shared/hooks/useScreenSize";

export const SkillIconValue: React.FC<{
  iconName: IconName;
  skillValue: number;
  isEnemy?: boolean;
}> = ({ iconName, skillValue, isEnemy }) => {
  const { isLargeScreen } = useScreenSize();

  const getSkillColor = (): string => {
    switch (iconName) {
      case IconName.MAGIC:
        return "bg-gradient-to-br from-purple-300 to-purple-500";
      case IconName.SHIELD:
        return "bg-gradient-to-br from-cyan-300 to-blue-300";
      case IconName.SWORD:
      case IconName.HEART:
        return "bg-gradient-to-br from-red-300 to-red-500";

      default:
        return "";
    }
  };
  return (
    <div className={`flex items-center ${isEnemy ? "flex-row-reverse" : ""}`}>
      <div
        className={`flex rounded-full z-10 p-2 border-2 border-black ${getSkillColor()}`}
      >
        <Icon
          icon={iconName}
          className={`${isLargeScreen ? "text-4xl" : "text-3xl"}`}
        />
      </div>
      <span
        className={`z-0 py-1 ${
          isEnemy ? "-mr-6 pl-8 pr-12" : "-ml-6 pl-12 pr-8"
        } text-xl border-2 border-black rounded-container font-bold bg-amber-200 bg-gradient-to-t`}
      >
        {skillValue}
      </span>
    </div>
  );
};
