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
        "relative hover:z-20 flex flex-col items-center p-4 bg-white border-2 border-black w-96 rounded-container"
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
            className="self-end"
            onClick={() => setIsEditing(true)}
          />
          <img
            src={`/greek-gods/${character.name}.svg`}
            alt={`${character.name}`}
            className="h-56 m-4"
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
            </div>
            <div className="flex flex-col gap-4">
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
    //   <div className="max-w-sm p-6 bg-white border-4 border-yellow-300 rounded-lg shadow-lg">
    //   <div className="flex items-center">
    //     <img
    //       src="https://via.placeholder.com/80"
    //       alt="Zeus"
    //       className="border-2 border-yellow-400 rounded-full"
    //     />
    //     <div className="ml-4">
    //       <h2 className="text-2xl font-bold text-yellow-700">Zeus</h2>
    //       <p className="text-gray-600">Roi des dieux</p>
    //     </div>
    //   </div>
    //   <div className="mt-4 space-y-2">
    //     <div className="flex justify-between text-gray-700">
    //       <span>Attaque :</span> <span className="font-semibold">95</span>
    //     </div>
    //     <div className="flex justify-between text-gray-700">
    //       <span>Défense :</span> <span className="font-semibold">85</span>
    //     </div>
    //     <div className="flex justify-between text-gray-700">
    //       <span>Santé :</span> <span className="font-semibold">100</span>
    //     </div>
    //   </div>
    // </div>
  );
};
