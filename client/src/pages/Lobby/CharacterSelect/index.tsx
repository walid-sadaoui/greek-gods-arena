import React from "react";
import { Link, Redirect } from "react-router-dom";
import { newFight } from "api/fights";
import { Fight } from "models/Fight";
import Button from "components/common/Button";
import { ContainerRow } from "components/common/Container";
import { Character, GreekGods } from "models/Character";
import { useTeam } from "shared/context/TeamContext";
import { GreekGodDetail } from "../elements/GreekGodDetail";
import PageTitle from "components/app/PageTitle";

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

  const renderGreekGodSelect = (
    character: Character,
    index: number
  ): JSX.Element => {
    return (
      <li key={character.name}>
        <button onClick={() => selectGod(index)} className="list-item-button">
          <GreekGodDetail
            onUpdate={() => selectGod(index)}
            character={character}
            isSelected={characterSelected?.name === character.name}
          />
        </button>
      </li>
    );
  };

  return (
    <>
      <ContainerRow>
        <div className="flex flex-col items-center w-full h-full p-4 justify">
          <div className="grid items-center w-full grid-cols-5">
            <Link
              to="/lobby"
              className="col-start-1 text-2xl text-white hover:text-black text-outline font-greek"
            >
              Back
            </Link>
            <div className="items-center col-span-3 col-start-2">
              <PageTitle title="Choose your God" />
            </div>
          </div>
          <ul className="grid grid-cols-4 gap-8 my-auto">
            {teamSelected.characters.map((greekGod, index) => {
              return renderGreekGodSelect(greekGod, index);
            })}
          </ul>
          {characterSelected && (
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
                I Choose{" "}
                <span className="text-xl font-greek">
                  {characterSelected.name}
                </span>
              </Button>
              <p className="text-red-500">{fightError}</p>
            </div>
          )}
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
