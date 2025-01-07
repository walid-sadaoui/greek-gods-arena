import React from "react";
import { ContainerRow } from "components/common/Container";
import { useTeam } from "shared/context/TeamContext";
import AppLink from "components/common/Link";

const Lobby: React.FC = () => {
  const { teams, teamSelected, setTeamSelected } = useTeam();

  return (
    <>
      <ContainerRow>
        {teams.length > 0 && (
          <div className="flex flex-col items-center justify-between w-full h-full p-4">
            <h2 className="mb-4 text-6xl font-black text-outline font-greek">
              Choose your Team
            </h2>
            <ul className="grid grid-cols-3 gap-8">
              {teams.map((team) => {
                return (
                  <section
                    className={`${
                      teamSelected?._id === team._id
                        ? "border-green-600 border-4"
                        : ""
                    } relative flex flex-col items-center justify-between w-72 h-72 p-4 bg-white border-2 border-black hover:z-20 hover:scale-100 hover:transform hover:border-amber-200 rounded-container`}
                    key={team._id}
                  >
                    <button
                      onClick={() => setTeamSelected(team)}
                      className="flex flex-col items-center justify-between h-full p-2"
                    >
                      <span className="mb-4 text-2xl text-center uppercase font-greek">
                        {team.teamName}
                      </span>
                      <span className="text-justify">{team.description}</span>
                      <div className="flex items-center gap-2">
                        {team.characters.map((character) => (
                          <div
                            key={character.name}
                            className="flex flex-col items-center"
                          >
                            <img
                              src={`/greek-gods/${character.name}.svg`}
                              alt={character.name}
                              className="h-16"
                            />
                            <span className="text-xs font-greek">
                              {character.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </button>
                    {teamSelected?._id === team._id && (
                      <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-black rounded-full">
                        <span className="p-2 text-4xl text-white">✓</span>
                      </div>
                    )}
                  </section>
                );
              })}
            </ul>
            {teamSelected && (
              <AppLink to="/lobby/select-god">
                I Choose Team{" "}
                <span className="text-xl font-greek">
                  {teamSelected.teamName}
                </span>
              </AppLink>
            )}
          </div>
        )}
      </ContainerRow>
    </>
  );
};

export default Lobby;
