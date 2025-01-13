import React from "react";
import Modal from "components/common/Modal";
import { Character } from "models/Character";
import CharacterEdit from "components/characters/CharacterEdit";

const UpgradeGodModal: React.FC<{
  character: Character;
  hide: () => void;
  isShowing: boolean;
  onUpdate: (updateCharacter: Character) => void;
}> = ({ character, isShowing, hide, onUpdate }) => {
  return (
    <Modal isShowing={isShowing} hide={hide}>
      <div className="flex flex-col items-center justify-center w-64">
        <h3 className="font-greek text-2xl">{character.name}</h3>
        <img
          src={`/greek-gods/profile/${character.name}.svg`}
          alt={`${character.name}`}
          className="h-24 col-start-2"
        />
        <CharacterEdit
          character={character}
          onUpdate={(updatedCharacter) => onUpdate(updatedCharacter)}
        />
      </div>
    </Modal>
  );
};

export default UpgradeGodModal;
