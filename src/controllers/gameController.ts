import { Request, Response } from "express";
import { createGameRecord, getGamesForUser } from "../models/gameModel";

export const saveFinishedGame = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const { rounds, didWin } = req.body;

    if (typeof rounds !== "number" || typeof didWin !== "boolean") {
      return res.status(400).json({ error: "Invalid game data" });
    }

    const finishedAt = new Date();

    const game = await createGameRecord(
      userId,
      rounds,
      didWin,
      finishedAt
    );

    res.status(201).json(game);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save game" });
  }
};

export const getUserGames = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const games = await getGamesForUser(userId);
    res.json(games);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch games" });
  }
};