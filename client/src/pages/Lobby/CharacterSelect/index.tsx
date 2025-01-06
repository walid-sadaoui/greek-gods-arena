import React from "react";
import { Redirect } from "react-router-dom";
import { newFight } from "api/fights";
import { Fight } from "models/Fight";
import Button from "components/common/Button";
import { ContainerRow } from "components/common/Container";
import { Character, GreekGods } from "models/Character";
import { useTeam } from "shared/context/TeamContext";
import { GreekGodDetail } from "../elements/GreekGodDetail";

const CharacterSelect: React.FC = () => {
  const { teamSelected } = useTeam();
  const [characterSelected, setCharacterSelected] = React.useState<
    Character | undefined
  >(undefined);
  const [fight, setFight] = React.useState<Fight | undefined>(undefined);
  const [fightError, setFightError] = React.useState<string>("");

  if (!teamSelected)
    return (
      <Redirect
        to={{
          pathname: "/lobby",
        }}
      />
    );

  const runFight = async (
    teamId: string,
    greekGodName: GreekGods
  ): Promise<void> => {
    const { data, error } = await newFight(teamId, greekGodName);

    if (data) setFight(data.fight);
    if (error) setFightError(error.message);
  };

  const selectGod = (characterIndex: number): void => {
    setCharacterSelected(teamSelected.characters[characterIndex]);
  };

  const renderGreekGodSelect = (character: Character, index: number) => {
    return (
      <li key={character.name}>
        <GreekGodDetail
          onUpdate={() => selectGod(index)}
          character={character}
        />
      </li>
    );
  };

  return (
    <>
      <ContainerRow>
        <div className="flex flex-col items-center justify-between w-full h-full p-4">
          <h2 className="mb-4 text-6xl font-black text-outline font-greek">
            Choose your God
          </h2>
          <div className="flex flex-col items-center">
            {/* <GreekGodSelectList onSelectGod={ () => selectGod} /> */}
            <ul className="grid grid-cols-4 gap-8">
              {teamSelected.characters.map((greekGod, index) => {
                return renderGreekGodSelect(greekGod, index);
              })}
            </ul>
          </div>
          <div className="flex flex-col items-center w-full">
            <Button
              onClick={() =>
                runFight(
                  teamSelected._id,
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

export default CharacterSelect;
