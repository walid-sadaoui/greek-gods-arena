import express from "express";
import {
  createCharacter,
  deleteCharacter,
  getCharacter,
  getCharacters,
  updateCharacter,
} from "../characters/characterService";
import { getTeam } from "./teamsDataManager";
import { getTeams } from "./teamsService";

const router = express.Router();

router.get("/", async (_req, res, next) => {
  try {
    const teams = await getTeams();

    return res.status(200).json({
      data: {
        code: 200,
        message: `${teams.length} teams found !`,
        teams,
      },
    });
  } catch (error) {
    return next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const team = await getTeam(id);

    return res.status(200).json({
      data: {
        code: 200,
        message: `Team ${team.teamName} found !`,
        team,
      },
    });
  } catch (error) {
    return next(error);
  }
});

router.get("/:id/characters", async (req, res, next) => {
  try {
    const { id } = req.params;

    const characters = await getCharacters(id);

    return res.status(200).json({
      data: {
        code: 200,
        message: `${characters.length} characters found !`,
        characters,
      },
    });
  } catch (error) {
    return next(error);
  }
});

router.get("/:id/characters/:characterName", async (req, res, next) => {
  try {
    const { id, characterName } = req.params;

    const character = await getCharacter(id, characterName);

    return res.status(200).json({
      data: {
        code: 200,
        message: `Character ${character.name} found !`,
        character,
      },
    });
  } catch (error) {
    return next(error);
  }
});

router.post("/:id/characters", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { characterName } = req.body;

    const character = await createCharacter(characterName, id);

    return res.status(200).json({
      data: {
        code: 200,
        message: "Character created !",
        character,
      },
    });
  } catch (error) {
    return next(error);
  }
});

router.delete("/:id/characters/:characterName", async (req, res, next) => {
  try {
    const { id, characterName } = req.params;

    await deleteCharacter(id, characterName);

    return res.status(200).json({
      data: {
        code: 200,
        message: `Character ${characterName} deleted !`,
      },
    });
  } catch (error) {
    return next(error);
  }
});

router.post("/:id/characters/:characterName", async (req, res, next) => {
  try {
    const { id, characterName } = req.params;
    const characterProperties = req.body;

    const updatedCharacter = await updateCharacter(
      id,
      characterName,
      characterProperties
    );

    return res.status(200).json({
      data: {
        code: 200,
        message: `Character ${characterName} updated !`,
        character: updatedCharacter,
      },
    });
  } catch (error) {
    return next(error);
  }
});

export default router;
