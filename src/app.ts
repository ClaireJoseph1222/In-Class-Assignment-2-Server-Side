import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import gameRoutes from "./routes/gameRoutes";
import { requestLogger } from "./middleware/requestLogger";
import { errorHandler } from "./middleware/errorHandler";

export const createApp = (): express.Express => {
  const app = express();

  app.use(cors());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(requestLogger);

  app.use(authRoutes);
  app.use(gameRoutes);

  app.use(errorHandler);

  return app;
};