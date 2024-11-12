import { APIResponse, getRequest, ResponseData } from '.';
import { Universe } from 'models/Universe';

interface GetUniversesData extends ResponseData {
  universes: Universe[];
}

interface GetUniverseData extends ResponseData {
  universe: Universe;
}

// export const getCurrentUser = async (): Promise<APIResponse<GetUserData>> => {
//   const getCurrentUserResponse = await getRequest<GetUserData>('/me');
//   return getCurrentUserResponse;
// };

export const getUniverses = async (): Promise<
  APIResponse<GetUniversesData>
> => {
  const getCurrentUserResponse = await getRequest<GetUniversesData>(
    '/universes'
  );
  return getCurrentUserResponse;
};

export const getUniverse = async (
  universeId: string
): Promise<APIResponse<GetUniverseData>> => {
  const getCurrentUserResponse = await getRequest<GetUniverseData>(
    `/universes/${universeId}`
  );
  return getCurrentUserResponse;
};

// export const updateCharacter = async (
//   userId: string,
//   characterName: string,
//   characterProperties: CharacterSkills
// ): Promise<APIResponse<EditCharacterData>> => {
//   const editCharacterResponse = await postRequest<EditCharacterData>(
//     `/users/${userId}/characters/${characterName}`,
//     JSON.stringify(characterProperties)
//   );
//   return editCharacterResponse;
// };
