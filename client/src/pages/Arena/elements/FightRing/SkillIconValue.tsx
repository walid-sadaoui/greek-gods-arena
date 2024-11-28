import React from 'react';
import Icon, { IconName } from 'components/common/Icon';

export const SkillIconValue: React.FC<{
  iconName: IconName;
  skillValue: number;
  isEnemy: boolean;
}> = ({ iconName, skillValue, isEnemy }) => {
  const getSkillColor = (): string => {
    switch (iconName) {
      case IconName.MAGIC:
        return 'bg-gradient-to-br from-purple-300 to-purple-500';
      case IconName.SHIELD:
        return 'bg-gradient-to-br from-cyan-500 to-blue-500';
      case IconName.SWORD:
        return 'bg-gradient-to-br from-red-300 to-red-500';

      default:
        return '';
    }
  };
  return (
    <div className={`flex items-center ${isEnemy ? 'flex-row-reverse' : ''}`}>
      <div
        className={`flex rounded-full z-10 p-2 border-2 border-black ${getSkillColor()}`}
      >
        <Icon icon={iconName} className='text-4xl' />
      </div>
      <span
        className={`z-0 px-8 py-2 ${
          isEnemy ? '-mr-4' : '-ml-4'
        } text-xl border-2 border-black rounded-container font-greek font-bold bg-amber-200 bg-gradient-to-t`}
      >
        {skillValue}
      </span>
    </div>
  );
};
