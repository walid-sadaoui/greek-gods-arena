import CharacterEdit from "components/characters/CharacterEdit";
import Button from "components/common/Button";
import { Character } from "models/Character";
import React from "react";
import { IconName } from "components/common/Icon";
import classNames from "classnames";
import { SkillIconValue } from "pages/Arena/elements/FightRing/SkillIconValue";

interface GreekGodDetailProps {
  character: Character;
  onUpdate: (character: Character) => void;
  isSelected: boolean;
}

export const GreekGodDetail: React.FC<GreekGodDetailProps> = ({
  character,
  onUpdate,
  isSelected,
}) => {
  const [isEditing, setIsEditing] = React.useState<boolean>(false);

  const onUpdateGod = (updatedCharacter: Character): void => {
    setIsEditing(false);
    onUpdate(updatedCharacter);
  };

  return (
    <article
      className={classNames(
        "relative hover:z-20 cursor-pointer hover:scale-100 hover:transform hover:border-amber-200 flex flex-col items-center p-4 bg-white border-2 border-black w-48 rounded-container",
        {
          "border-green-600": isSelected,
        }
      )}
    >
      {isSelected && (
        <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-black rounded-full">
          <span className="p-2 text-4xl text-white">✓</span>
        </div>
      )}
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
            className="self-end"
            onClick={() => setIsEditing(true)}
          />
          <img
            src={`/greek-gods/${character.name}.svg`}
            alt={`${character.name}`}
            className="h-40 m-4"
          />
          <span className="text-xl font-greek">{character.name}</span>
          <span className="pb-4 font-greek">Lvl. {character.level}</span>
          <div className="flex gap-4 p-4">
            <div className="flex flex-col gap-4">
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
              <SkillIconValue
                iconName={IconName.MAGIC}
                skillValue={character.magik}
              />
            </div>
          </div>
        </>
      )}
    </article>
  );
};
