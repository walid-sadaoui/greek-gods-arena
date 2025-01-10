import React from "react";
import { Redirect } from "react-router-dom";
import { newFight } from "api/fights";
import { Fight } from "models/Fight";
import Button, { Variants } from "components/common/Button";
import { ContainerRow } from "components/common/Container";
import { Character, GreekGods } from "models/Character";
import { useTeam } from "shared/context/TeamContext";
import { GreekGodDetail } from "../elements/GreekGodDetail";
import PageTitle from "components/app/PageTitle";

const CharacterSelect: React.FC = () => {
  const { teamSelected, setTeamSelected } = useTeam();
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
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    characterIndex: number
  ): void => {
    if (event.key === "Enter" || event.key === " ") {
      selectGod(characterIndex);
    }
  };

  const renderGreekGodSelect = (
    character: Character,
    index: number
  ): JSX.Element => {
    return (
      <li key={character.name}>
        <div
          onClick={() => selectGod(index)}
          onKeyDown={(event) => handleKeyDown(event, index)}
          tabIndex={0}
          role="button"
          className="list-item-button"
        >
          <GreekGodDetail
            onUpdate={() => selectGod(index)}
            character={character}
            isSelected={characterSelected?.name === character.name}
          />
        </div>
      </li>
    );
  };

  return (
    <>
      <ContainerRow>
        <div className="flex flex-col items-center w-full h-full p-4 justify">
          <div className="grid items-center w-full grid-cols-5">
            <Button
              onClick={() => setTeamSelected(undefined)}
              variant={Variants.DEFAULT}
              className="col-start-1 text-2xl text-white hover:text-black text-outline font-greek"
            >
              Back
            </Button>
            <div className="items-center col-span-3 col-start-2">
              <PageTitle title="Choose your God" />
            </div>
          </div>
          <ul className="grid grid-cols-2 gap-8 my-auto">
            {teamSelected.characters.map((greekGod, index) => {
              return renderGreekGodSelect(greekGod, index);
            })}
          </ul>
          <div className="flex flex-col items-center w-full">
            <Button
              onClick={() =>
                runFight(
                  teamSelected._id,
                  characterSelected?.name ?? GreekGods.ZEUS
                )
              }
              disabled={!characterSelected || characterSelected.attack === 0}
            >
              <span className="text-xl font-greek">Enter the Arena</span>
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
