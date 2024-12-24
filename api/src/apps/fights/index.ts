import express from "express";
import { getFight, newFight } from "./fightService";
import { IFight } from "./fightModel";

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const { universeId, characterName } = req.body;

    const fight: IFight = await newFight(universeId, characterName);

    return res.status(200).json({
      data: {
        code: 200,
        message: `Fight generated !`,
        fight,
      },
    });
  } catch (error) {
    return next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const fight: IFight = await getFight(id);

    return res.status(200).json({
      data: {
        code: 200,
        message: `Fight retrieved !`,
        fight,
      },
    });
  } catch (error) {
    return next(error);
  }
});

export default router;
