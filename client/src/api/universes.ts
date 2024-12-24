import { Character, CharacterSkills } from "models/Character";
import { APIResponse, getRequest, postRequest, ResponseData } from "./utils";
import { Universe } from "models/Universe";

interface GetUniversesData extends ResponseData {
  universes: Universe[];
}

interface GetUniverseData extends ResponseData {
  universe: Universe;
}

interface GetUniverseData extends ResponseData {
  universe: Universe;
}

interface EditCharacterData extends ResponseData {
  character: Character;
}

export const getUniverses = async (): Promise<
  APIResponse<GetUniversesData>
> => {
  const getCurrentUniverseResponse = await getRequest<GetUniversesData>(
    "/universes"
  );
  return getCurrentUniverseResponse;
};

export const getUniverse = async (
  universeId: string
): Promise<APIResponse<GetUniverseData>> => {
  const getCurrentUniverseResponse = await getRequest<GetUniverseData>(
    `/universes/${universeId}`
  );
  return getCurrentUniverseResponse;
};

export const updateCharacter = async (
  universeId: string,
  characterName: string,
  characterProperties: CharacterSkills
): Promise<APIResponse<EditCharacterData>> => {
  const editCharacterResponse = await postRequest<EditCharacterData>(
    `/universes/${universeId}/characters/${characterName}`,
    JSON.stringify(characterProperties)
  );
  return editCharacterResponse;
};
