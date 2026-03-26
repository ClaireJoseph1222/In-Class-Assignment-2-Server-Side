import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { createUser, findUserByEmail } from "../models/userModel";
import { DbUser } from "../types/db";
import { JwtPayload } from "../types/auth";

const SALT_ROUNDS = 10;

export const registerUser = async (
  username: string,
  email: string,
  password: string,
): Promise<DbUser> => {
  const existing = await findUserByEmail(email);
  if (existing) {
    throw new Error("Email already in use");
  }
  const hash = await bcrypt.hash(password, SALT_ROUNDS);
  return createUser(username, email, hash);
};

export const loginUser = async (
  email: string,
  password: string,
): Promise<{ token: string; user: DbUser }> => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error("Invalid credentials");
  }
  const match = await bcrypt.compare(password, user.user_password);
  if (!match) {
    throw new Error("Invalid credentials");
  }

  const payload: JwtPayload = {
    userId: user.id,
    username: user.username,
  };

  const token = jwt.sign(payload, env.jwtSecret, { expiresIn: "1d" });
  return { token, user };
};

export const verifyToken = (token: string): JwtPayload => {
  const decoded = jwt.verify(token, env.jwtSecret);
  return decoded as JwtPayload;
};
