import React from "react";
import { Redirect } from "react-router-dom";
import { newFight } from "api/fights";
// import { createUniverse } from 'api/universes';
import { Fight } from "models/Fight";
import Button from "components/common/Button";
import { ContainerRow } from "components/common/Container";
import { Character, GreekGods } from "models/Character";
import { GreekGodSelectList } from "./elements/GreekGodSelectList";
import { useUniverse } from "shared/context/UniverseContext";
import Card from "components/common/Card";
import CreateUniverseModal from "./elements/CreateUniverseModal";
import { Universe } from "models/Universe";

const Lobby: React.FC = () => {
  const { universes, universeSelected } = useUniverse();
  const [characterSelected, setCharacterSelected] = React.useState<
    Character | undefined
  >(undefined);
  const [fight, setFight] = React.useState<Fight | undefined>(undefined);
  const [fightError, setFightError] = React.useState<string>("");
  const [showCreateUniverseModal, setShowCreateUniverseModal] =
    React.useState<boolean>(false);

  const runFight = async (
    universeId: string,
    greekGodName: GreekGods
  ): Promise<void> => {
    const { data, error } = await newFight(universeId, greekGodName);

    if (data) setFight(data.fight);
    if (error) setFightError(error.message);
  };

  const selectGod = (
    selectedUniverse: Universe,
    characterIndex: number
  ): void => {
    setCharacterSelected(selectedUniverse.characters[characterIndex]);
  };

  const handleCreateUniverse = (universeName: string): void => {
    // TODO : error : don't quit modal, already used message
    console.error({ universeName });
    setShowCreateUniverseModal(false);
    // createUniverse(universeName);
  };

  return (
    <>
      <ContainerRow>
        {universes.length > 0 && (
          <div className="flex flex-col items-center gap-4 p-4 backdrop-blur-md backdrop-brightness-150 rounded-xl">
            <h2 className="text-4xl font-greek">Choose your Universe</h2>
            {universes.map((universe) => {
              return (
                <Card>
                  <div className="">{universe.universeName}</div>
                </Card>
              );
            })}
            <Button onClick={() => setShowCreateUniverseModal(true)}>
              Create Universe
            </Button>
            <CreateUniverseModal
              isShowing={showCreateUniverseModal}
              onValidate={handleCreateUniverse}
              hide={() => setShowCreateUniverseModal(false)}
            />
          </div>
        )}
        {universeSelected ? (
          <div className="flex flex-col items-center justify-around flex-1 h-full">
            <GreekGodSelectList onSelectGod={selectGod} />
            <div className="flex flex-col items-center w-full">
              <Button
                onClick={() =>
                  runFight(
                    universeSelected._id,
                    characterSelected?.name ?? GreekGods.ZEUS
                  )
                }
                disabled={characterSelected?.attack === 0}
              >
                Start the Fight
              </Button>
              <p className="text-red-500">{fightError}</p>
            </div>
          </div>
        ) : (
          <span>Please select a Universe</span>
        )}
      </ContainerRow>
      {fight && (
        <Redirect
          to={{
            pathname: "/room",
            state: { fight: fight },
          }}
        />
      )}
    </>
  );
};

export default Lobby;
