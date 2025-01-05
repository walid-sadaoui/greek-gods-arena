import React from "react";
import { Link, Redirect } from "react-router-dom";
import { newFight } from "api/fights";
import { Fight } from "models/Fight";
import Button from "components/common/Button";
import { ContainerRow } from "components/common/Container";
import { Character, GreekGods } from "models/Character";
import { GreekGodSelectList } from "./elements/GreekGodSelectList";
import { useTeam } from "shared/context/TeamContext";
import { Team } from "models/Team";

const Lobby: React.FC = () => {
  const { teams, teamSelected, setTeamSelected } = useTeam();
  const [characterSelected, setCharacterSelected] = React.useState<
    Character | undefined
  >(undefined);
  const [fight, setFight] = React.useState<Fight | undefined>(undefined);
  const [fightError, setFightError] = React.useState<string>("");

  const runFight = async (
    teamId: string,
    greekGodName: GreekGods
  ): Promise<void> => {
    const { data, error } = await newFight(teamId, greekGodName);

    if (data) setFight(data.fight);
    if (error) setFightError(error.message);
  };

  const selectGod = (selectedTeam: Team, characterIndex: number): void => {
    setCharacterSelected(selectedTeam.characters[characterIndex]);
  };

  return (
    <>
      <ContainerRow>
        {teams.length > 0 && (
          <div className="flex flex-col items-center justify-between w-full h-full p-4">
            <h2 className="mb-4 text-6xl font-black text-outline font-greek">
              Choose your Team
            </h2>
            <ul className="grid grid-cols-3 gap-4">
              {teams.map((team) => {
                return (
                  <section
                    className={`${
                      teamSelected?._id === team._id ? "border-green-300" : ""
                    } relative flex flex-col items-center w-48 p-4 bg-white border-2 border-black hover:z-20 hover:scale-100 hover:transform hover:border-amber-200 rounded-container`}
                    key={team._id}
                  >
                    <button
                      onClick={() => setTeamSelected(team)}
                      className="flex flex-col "
                    >
                      <span className="font-mono text-3xl">
                        {team.teamName}
                      </span>
                      <span>{team.description}</span>
                    </button>
                  </section>
                );
              })}
            </ul>
            {teamSelected && (
              <div className="flex flex-col items-center justify-around">
                <div className="flex flex-col items-center w-full">
                  <Link to="/lobby/select-god">
                    I choose you {teamSelected?.teamName}
                  </Link>
                  <p className="text-red-500">{fightError}</p>
                </div>
              </div>
            )}
          </div>
        )}
        {/* {teamSelected ? (
          <div className="flex flex-col items-center justify-around flex-1 h-full">
            <GreekGodSelectList onSelectGod={selectGod} />
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
        ) : (
          <span>Please select a Team</span>
        )} */}
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
