import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { AuthTokenPayload } from "../types/auth";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: "Missing token" });

  const token = header.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Missing token" });

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as AuthTokenPayload;

    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
};