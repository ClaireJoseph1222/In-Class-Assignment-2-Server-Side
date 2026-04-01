import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import { saveFinishedGame, getUserGames } from "../controllers/gameController";

const router = Router();

router.post("/games/finish", authMiddleware, saveFinishedGame);
router.get("/games", authMiddleware, getUserGames);

export default router;