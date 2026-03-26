import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/authService";
import { logger } from "../config/logger";

interface RegisterBody {
  username?: string;
  email?: string;
  password?: string;
}

interface LoginBody {
  email?: string;
  password?: string;
}

export const registerHandler = async (
  req: Request<unknown, unknown, RegisterBody>,
  res: Response,
): Promise<void> => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).json({ message: "Missing fields" });
    return;
  }

  try {
    const user = await registerUser(username, email, password);
    logger.info({ userId: user.id }, "User registered");
    res
      .status(201)
      .json({ id: user.id, username: user.username, email: user.email });
  } catch (error) {
    logger.error({ error }, "Register failed");
    res.status(400).json({ message: (error as Error).message });
  }
};

export const loginHandler = async (
  req: Request<unknown, unknown, LoginBody>,
  res: Response,
): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Missing fields" });
    return;
  }

  try {
    const { token, user } = await loginUser(email, password);
    logger.info({ userId: user.id }, "User logged in");
    res.json({
      token,
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (error) {
    logger.error({ error }, "Login failed");
    res.status(401).json({ message: (error as Error).message });
  }
};
