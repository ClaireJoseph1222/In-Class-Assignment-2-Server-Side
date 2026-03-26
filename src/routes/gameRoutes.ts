import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import {
  completeGameHandler,
  getGameHistoryHandler,
} from "../controllers/gameController";

export const gameRouter = Router();

gameRouter.use(authMiddleware);

gameRouter.post("/games/complete", completeGameHandler);
gameRouter.get("/games/history", getGameHistoryHandler);
