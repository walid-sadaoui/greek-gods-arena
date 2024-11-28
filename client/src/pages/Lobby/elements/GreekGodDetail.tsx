import CharacterEdit from 'components/characters/CharacterEdit';
import Button from 'components/common/Button';
import { Character } from 'models/Character';
import React from 'react';
import { IconName } from 'components/common/Icon';
import classNames from 'classnames';
import { SkillIconValue } from 'pages/Arena/elements/FightRing/SkillIconValue';

interface GreekGodDetailProps {
  character: Character;
  onUpdate: (character: Character) => void;
}

export const GreekGodDetail: React.FC<GreekGodDetailProps> = ({
  character,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = React.useState<boolean>(false);

  const onUpdateGod = (updatedCharacter: Character) => {
    setIsEditing(false);
    onUpdate(updatedCharacter);
  };

  return (
    <article
      className={classNames(
        'relative hover:z-20 flex flex-col items-center p-4 bg-white border-2 border-black w-48 rounded-container'
      )}
    >
      {isEditing ? (
        <CharacterEdit
          character={character}
          onUpdate={onUpdateGod}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <Button
            icon={IconName.PENCIL}
            className='self-end'
            onClick={() => setIsEditing(true)}
          />
          <img
            src={`/greek-gods/${character.name}.svg`}
            alt={`${character.name}`}
            className='m-4 h-36'
          />
          <span className='text-xl font-greek'>{character.name}</span>
          <span className='pb-4 font-greek'>Lvl. {character.level}</span>
          <div className='flex flex-wrap'>
            <SkillIconValue
              iconName={IconName.HEART}
              skillValue={character.health}
            />
            <SkillIconValue
              iconName={IconName.SWORD}
              skillValue={character.attack}
            />
            <SkillIconValue
              iconName={IconName.SHIELD}
              skillValue={character.defense}
            />
          </div>
        </>
      )}
    </article>
  );
};
