import React from "react";
import { useParams } from "react-router-dom";
import { getFight } from "api/fights";
import { Fight } from "models/Fight";
import FightRing from "./elements/FightRing";
import ArenaFooter from "./elements/ArenaFooter";

const Arena: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [fight, setFight] = React.useState<Fight | undefined>(undefined);
  const [turnCount, setTurnCount] = React.useState<number>(-1);

  React.useEffect(() => {
    async function prepareFight(): Promise<void> {
      const { data } = await getFight(id);
      if (data) {
        setFight(data.fight);
      }
    }
    prepareFight();
  }, []);

  return (
    <main className="flex flex-col w-full h-full">
      {fight && (
        <>
          <div className="flex flex-col justify-end flex-1">
            <FightRing fight={fight} turnCount={turnCount} />
            <ArenaFooter
              fight={fight}
              turnCount={turnCount}
              onPreviousTurn={() => setTurnCount(turnCount - 1)}
              onNextTurn={() => setTurnCount(turnCount + 1)}
            />
          </div>
        </>
      )}
    </main>
  );
};

export default Arena;
