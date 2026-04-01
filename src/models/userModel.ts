import { getDbPool } from "../config/db";
import type { User } from "../types/user";
import { RowDataPacket, ResultSetHeader } from "mysql2";

const pool = getDbPool();

interface DbUserRow {
  id: number;
  name: string;
  password_hash: string;
}

export const findUserByName = async (name: string): Promise<User | null> => {
  const [rows] = await pool.query<(DbUserRow & RowDataPacket)[]>(
    "SELECT id, name, password_hash FROM users WHERE name = ?",
    [name]
  );

  if (rows.length === 0) return null;

  const row = rows[0];
  return {
    id: row.id,
    name: row.name,
    passwordHash: row.password_hash
  };
};

export const createUser = async (
  name: string,
  passwordHash: string
): Promise<User> => {
  const [result] = await pool.query<ResultSetHeader>(
    "INSERT INTO users (name, password_hash) VALUES (?, ?)",
    [name, passwordHash]
  );

  return {
    id: result.insertId,
    name,
    passwordHash
  };
};