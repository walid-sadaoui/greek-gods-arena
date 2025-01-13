import React, { SetStateAction, useEffect } from "react";
import { Team } from "models/Team";
import { getTeams } from "api/teams";

type TeamContextProps = {
  teams: Team[];
  teamSelected: Team | undefined;
  setTeams: React.Dispatch<SetStateAction<Team[]>>;
  setTeamSelected: React.Dispatch<SetStateAction<Team | undefined>>;
};

const TeamContext = React.createContext<TeamContextProps | undefined>(
  undefined
);

const useTeam = (): TeamContextProps => {
  const teamContext = React.useContext(TeamContext);
  if (teamContext === undefined)
    throw new Error("useTeam must be used within an TeamProvider");
  return teamContext;
};

const TeamProvider: React.FC = ({ children }) => {
  const [teams, setTeams] = React.useState<Team[]>([]);
  const [teamSelected, setTeamSelected] = React.useState<Team | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchTeams = async (): Promise<void> => {
      const { data } = await getTeams();
      if (data && data.teams.length > 0) {
        setTeams(data.teams);
      }
    };
    fetchTeams();
  }, []);

  if (!teams || teams.length === 0) return <div>Loading...</div>;

  return (
    <TeamContext.Provider
      value={{ teams, setTeams, teamSelected, setTeamSelected }}
    >
      {children}
    </TeamContext.Provider>
  );
};

export { TeamProvider, useTeam };
