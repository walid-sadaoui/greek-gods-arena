import React from "react";
import { useParams } from "react-router-dom";
import { getFight } from "api/fights";
import { Fight } from "models/Fight";
import FightRing from "./elements/FightRing";
import { TextDisplayProvider } from "shared/context/TextDisplay";
import FightTurn from "./elements/FightTurn";
import FightResultModal from "./elements/FightRing/FightResultModal";

const ArenaFight: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [fight, setFight] = React.useState<Fight | undefined>(undefined);
  const [turnCount, setTurnCount] = React.useState<number>(-1);
  const [showModal, setShowModal] = React.useState<boolean>(false);

  React.useEffect(() => {
    async function prepareFight(): Promise<void> {
      const { data } = await getFight(id);
      if (data) {
        setFight(data.fight);
      }
    }
    prepareFight();
  }, []);

  React.useEffect(() => {
    if (fight && turnCount === fight.turns.length - 1) setShowModal(true);
  }, [turnCount]);

  return (
    <TextDisplayProvider>
      <main className="flex flex-col w-full h-full">
        {fight && (
          <>
            <div className="flex flex-col justify-end flex-1">
              <FightTurn
                fight={fight}
                turnCount={turnCount}
                onNextTurn={() => {
                  setTurnCount(
                    turnCount === fight.turns.length - 1 ? -1 : turnCount + 1
                  );
                }}
              />
              <FightRing fight={fight} turnCount={turnCount} />
            </div>
            <FightResultModal
              isShowing={showModal}
              character={
                fight.winner === fight.firstOpponent._id
                  ? fight.firstOpponent
                  : fight.secondOpponent
              }
              onReplay={() => {
                setTurnCount(-1);
                setShowModal(false);
              }}
              hide={() => setShowModal(false)}
            />
          </>
        )}
      </main>
    </TextDisplayProvider>
  );
};

export default ArenaFight;
