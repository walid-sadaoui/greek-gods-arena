import React from "react";
import Modal from "components/common/Modal";
import { Character } from "models/Character";
import Button from "components/common/Button";
import AppLink from "components/common/AppLink";

// The Winner is "God Name" ! From the "God Name" team
// Icone du God
// Animation de victoire
// Bouton Home, bouton Lobby, Bouton Replay, Bouton Revenge
const FightResultModal: React.FC<{
  character: Character;
  hide: () => void;
  onReplay: () => void;
  isShowing: boolean;
}> = ({ character, isShowing, hide, onReplay }) => {
  return (
    <Modal isShowing={isShowing} hide={hide}>
      <div className={`flex flex-col w-full h-full p-4 items-center`}>
        <h2 className="text-5xl font-greek font-black">Winner</h2>
        <img
          src={`/greek-gods/${character.name}.svg`}
          alt={`${character.name}`}
          className={`m-4 h-64`}
        />
        <span className="text-4xl font-black text-white font-greek text-outline">
          {character.name}
        </span>
        <div className="flex items-center justify-center gap-4 p-4">
          {/* <Button onClick={onRevenge}>
            <span className="text-xl font-greek">REVENGE</span>
          </Button> */}
          <Button onClick={onReplay}>
            <span className="text-xl font-greek">REPLAY</span>
          </Button>
          <AppLink to="/">
            <span className="text-xl font-greek">LOBBY</span>
          </AppLink>
        </div>
      </div>
    </Modal>
  );
};

export default FightResultModal;
