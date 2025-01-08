import React from "react";
import { ContainerRow } from "components/common/Container";
import { useTeam } from "shared/context/TeamContext";
import { Redirect } from "react-router-dom";
import PageTitle from "components/app/PageTitle";

const Lobby: React.FC = () => {
  const { teams, teamSelected, setTeamSelected } = useTeam();

  return (
    <>
      <ContainerRow>
        {teams.length > 0 && (
          <div className="flex flex-col items-center w-full h-full p-4">
            <PageTitle title="Choose your Team" />
            <ul className="grid content-center flex-1 grid-cols-3 gap-8">
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
                    {teamSelected && (
                      <Redirect
                        to={{
                          pathname: "/lobby/select-god",
                        }}
                      />
                    )}
                  </section>
                );
              })}
            </ul>
          </div>
        )}
      </ContainerRow>
    </>
  );
};

export default Lobby;
