import * as TeamDM from "./teamsDataManager";

export const getTeam = async (teamId: string) => {
  const team = await TeamDM.getTeam(teamId);
  return team;
};

export const getTeams = async () => {
  const team = await TeamDM.getTeams();
  return team;
};
