import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { findUserByName, createUser } from "../models/userModel";
import type { AuthTokenPayload } from "../types/auth";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      return res.status(400).json({ error: "Missing name or password" });
    }

    const existing = await findUserByName(name);
    if (existing) {
      return res.status(400).json({ error: "User already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await createUser(name, passwordHash);

    res.status(201).json({
      id: user.id,
      name: user.name
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      return res.status(400).json({ error: "Missing name or password" });
    }

    const user = await findUserByName(name);
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const payload: AuthTokenPayload = {
      id: user.id,
      name: user.name
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "7d"
    });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
};