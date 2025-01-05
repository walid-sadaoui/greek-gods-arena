import { Character, CharacterSkills } from "models/Character";
import { APIResponse, getRequest, postRequest, ResponseData } from "./utils";
import { Team } from "models/Team";

interface GetTeamsData extends ResponseData {
  teams: Team[];
}

interface GetTeamData extends ResponseData {
  team: Team;
}

interface GetTeamData extends ResponseData {
  team: Team;
}

interface EditCharacterData extends ResponseData {
  character: Character;
}

export const getTeams = async (): Promise<APIResponse<GetTeamsData>> => {
  const getCurrentTeamResponse = await getRequest<GetTeamsData>("/teams");
  return getCurrentTeamResponse;
};

export const getTeam = async (
  teamId: string
): Promise<APIResponse<GetTeamData>> => {
  const getCurrentTeamResponse = await getRequest<GetTeamData>(
    `/teams/${teamId}`
  );
  return getCurrentTeamResponse;
};

export const updateCharacter = async (
  teamId: string,
  characterName: string,
  characterProperties: CharacterSkills
): Promise<APIResponse<EditCharacterData>> => {
  const editCharacterResponse = await postRequest<EditCharacterData>(
    `/teams/${teamId}/characters/${characterName}`,
    JSON.stringify(characterProperties)
  );
  return editCharacterResponse;
};
