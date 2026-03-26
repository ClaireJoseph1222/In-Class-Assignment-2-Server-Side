import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/authMiddleware";
import { createGameRecord, getGamesForUser } from "../models/gameModel";
import { logger } from "../config/logger";

interface CompleteGameBody {
  rounds?: number;
  userWin?: boolean;
}

export const completeGameHandler = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  const userId = req.userId;
  const { rounds, userWin } = req.body as CompleteGameBody;

  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  if (rounds === undefined || userWin === undefined) {
    res.status(400).json({ message: "Missing fields" });
    return;
  }

  try {
    const game = await createGameRecord(userId, rounds, userWin, new Date());
    logger.info({ userId, gameId: game.id }, "Game recorded");
    res.status(201).json(game);
  } catch (error) {
    logger.error({ error, userId }, "Complete game failed");
    res.status(500).json({ message: "Failed to save game" });
  }
};

export const getGameHistoryHandler = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  const userId = req.userId;

  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const games = await getGamesForUser(userId);
    res.json(games);
  } catch (error) {
    logger.error({ error, userId }, "Get history failed");
    res.status(500).json({ message: "Failed to load game history" });
  }
};
