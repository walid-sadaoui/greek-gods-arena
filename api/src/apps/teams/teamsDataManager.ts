import mongoose from "mongoose";
import HttpError from "../../common/error/httpError";
import { TeamData } from "./teamsModel";
import Team from "./teamsSchema";

export const getTeam = async (
  teamId: string
): Promise<TeamData & mongoose.Document<any, any, TeamData>> => {
  const team = await Team.findOne({ _id: teamId });
  if (!team) throw new HttpError(404, "Get Team error", "Team not found", true);
  return team;
};

export const getTeams = async (): Promise<
  TeamData[] & mongoose.Document<any, any, TeamData>[]
> => {
  const teams = await Team.find();
  // if (teams.length == 0)
  //   throw new HttpError(404, 'Get Team error', 'Team not found', true);
  return teams;
};
