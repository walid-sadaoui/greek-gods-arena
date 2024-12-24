import Button, { Variants } from "components/common/Button";
import { IconName } from "components/common/Icon";
import { Fight } from "models/Fight";
import React from "react";
import { Link } from "react-router-dom";

interface ArenaFooterProps {
  fight: Fight;
  turnCount: number;
  onPreviousTurn: React.MouseEventHandler<HTMLButtonElement>;
  onNextTurn: React.MouseEventHandler<HTMLButtonElement>;
}

const ArenaFooter: React.FC<ArenaFooterProps> = ({
  fight,
  turnCount,
  onPreviousTurn,
  onNextTurn,
}) => {
  return (
    <div className="flex flex-col">
      <progress
        max={fight.turns.length}
        value={turnCount + 1}
        className="w-full bg-green-500 border-4 border-black"
      ></progress>
      <div className="flex items-center justify-between p-4 bg-black font-greek bg-opacity-60">
        <div className="flex-1">
          <Link
            to="/"
            className="p-4 text-white rounded-container font-greek hover:bg-white hover:text-black"
          >
            Home
          </Link>
        </div>
        <div className="flex justify-between">
          <Button
            disabled={turnCount === -1}
            onClick={onPreviousTurn}
            className="mr-4"
          >
            Previous Turn
          </Button>
          <Button
            disabled={turnCount === fight.turns.length - 1}
            onClick={onNextTurn}
          >
            Next Turn
          </Button>
        </div>
        <div className="flex-1 text-right">
          <Button
            onClick={onPreviousTurn}
            className="mr-4"
            variant={Variants.DEFAULT}
            icon={IconName.VOLUME_MUTE}
          />
        </div>
      </div>
    </div>
  );
};

export default ArenaFooter;
