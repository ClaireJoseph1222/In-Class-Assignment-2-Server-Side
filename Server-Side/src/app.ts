import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { authRouter } from "./routes/authRoutes";
import { gameRouter } from "./routes/gameRoutes";
import { logger } from "./config/logger";

export const createApp = (): express.Express => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use("/api/auth", authRouter);
  app.use("/api", gameRouter);

  app.get("/health", (_req: Request, res: Response) => {
    res.json({ status: "ok" });
  });

  app.use(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
      logger.error({ err }, "Unhandled error");
      res.status(500).json({ message: "Internal server error" });
    },
  );

  return app;
};
