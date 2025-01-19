import React from "react";
import { Redirect } from "react-router-dom";
import { newFight } from "api/fights";
import { Fight } from "models/Fight";
import Button, { Variants } from "components/common/Button";
import { ContainerRow } from "components/common/Container";
import { Character, GreekGods } from "models/Character";
import { useTeam } from "shared/context/TeamContext";
import PageTitle from "components/app/PageTitle";
import Icon, { IconName } from "components/common/Icon";
import { GreekGodDetail } from "../elements/GreekGodDetail";

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
        <div className="flex flex-col items-center w-full h-full">
          <div className="grid items-center w-full grid-cols-5">
            <Button
              onClick={() => setTeamSelected(undefined)}
              variant={Variants.BASE}
              className="col-start-1 justify-self-center w-auto inline-flex text-6xl font-greek"
            >
              <Icon
                icon={IconName.BACK}
                className="text-4xl text-outline font-black "
              />
            </Button>
            <div className="items-center col-span-3 col-start-2">
              <PageTitle title="Choose your God" />
            </div>
          </div>
          <h3 className="flex items-center font-greek uppercase text-5xl text-gray-800 font-black text-shadow">
            <Icon icon={IconName.LAUREL_CROWN} className="mr-4" />
            Team {teamSelected.teamName}
            <Icon icon={IconName.LAUREL_CROWN} className="ml-4" />
          </h3>
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
            pathname: "/arena",
            state: { fight: fight },
          }}
        />
      )}
    </>
  );
};

export default CharacterSelect;
