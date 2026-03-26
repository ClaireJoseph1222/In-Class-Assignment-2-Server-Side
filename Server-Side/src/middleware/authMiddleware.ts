import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../services/authService";

export interface AuthenticatedRequest extends Request {
  userId?: number;
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): void => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  const token = header.slice("Bearer ".length);
  try {
    const payload = verifyToken(token);
    req.userId = payload.userId;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};
