import type { Request, Response, NextFunction } from "express";
import { logger } from "../logger/logger";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  logger.error({ err }, "Unhandled error");
  res.status(500).json({
    status: "error",
    data: { message: "Internal server error" }
  });
};