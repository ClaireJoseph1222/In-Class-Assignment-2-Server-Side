import { getDbPool } from "../config/db";
import { DbUser } from "../types/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export const findUserByEmail = async (
  email: string,
): Promise<DbUser | null> => {
  const pool = getDbPool();

  const [rows] = await pool.query<(DbUser & RowDataPacket)[]>(
    "SELECT * FROM user WHERE email = ?",
    [email],
  );

  return rows[0] ?? null;
};

export const findUserById = async (id: number): Promise<DbUser | null> => {
  const pool = getDbPool();

  const [rows] = await pool.query<(DbUser & RowDataPacket)[]>(
    "SELECT * FROM user WHERE id = ?",
    [id],
  );

  return rows[0] ?? null;
};

export const createUser = async (
  username: string,
  email: string,
  passwordHash: string,
): Promise<DbUser> => {
  const pool = getDbPool();

  const [result] = await pool.execute<ResultSetHeader>(
    "INSERT INTO user (username, email, user_password) VALUES (?, ?, ?)",
    [username, email, passwordHash],
  );

  const id = result.insertId;

  const user = await findUserById(id);
  if (!user) {
    throw new Error("Failed to create user");
  }

  return user;
};
