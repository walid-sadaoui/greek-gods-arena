import Button from "components/common/Button";
import { Character } from "models/Character";
import React from "react";
import classNames from "classnames";
import { IconName } from "components/common/Icon";
import UpgradeGodModal from "./UpgradeGodModal";

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
        "relative cursor-pointer hover:-rotate-3 hover:border-amber-200 flex flex-col items-center p-4 bg-white border-2 border-black w-64 h-64 rounded-container",
        {
          "border-green-600 transform rotate-3 z-20 scale-110 shadow-lg":
            isSelected,
        }
      )}
    >
      {isSelected && (
        <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-black rounded-full">
          <span className="p-2 text-4xl text-white">✓</span>
        </div>
      )}
      <div className="grid grid-cols-3 items-center">
        <img
          src={`/greek-gods/profile/${character.name}.svg`}
          alt={`${character.name}`}
          className="h-24 col-start-2"
        />
        <Button
          icon={IconName.PENCIL}
          className="justify-self-end self-start"
          onClick={() => setIsEditing(true)}
        />
      </div>
      <span className="text-xl font-greek">
        {character.name} (Lvl. {character.level})
      </span>
      <div className="grid grid-cols-2 gap-4">
        <span className="text-xl">Health {character.health}</span>
        <span className="text-xl">Attack {character.attack}</span>
        <span className="text-xl">Defense {character.defense}</span>
        <span className="text-xl">Magik {character.magik}</span>
      </div>
      <UpgradeGodModal
        character={character}
        hide={() => setIsEditing(false)}
        isShowing={isEditing}
        onUpdate={(updatedCharacter) => onUpdateGod(updatedCharacter)}
      />
    </article>
  );
};
