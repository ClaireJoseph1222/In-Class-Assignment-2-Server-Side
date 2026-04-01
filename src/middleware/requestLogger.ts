import type { Request, Response, NextFunction } from "express";
import { logger } from "../logger/logger";

export const requestLogger = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  logger.info({ method: req.method, url: req.url }, "Incoming request");
  next();
};