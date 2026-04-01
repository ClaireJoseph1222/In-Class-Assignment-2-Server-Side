import { getDbPool } from "../config/db";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import type { DbGame } from "../types/db";

const pool = getDbPool();

export const createGameRecord = async (
  userId: number,
  rounds: number,
  didWin: boolean,
  finishedAt: Date
): Promise<DbGame> => {
  const [result] = await pool.query<ResultSetHeader>(
    "INSERT INTO games (user_id, rounds, did_win, finished_at) VALUES (?, ?, ?, ?)",
    [userId, rounds, didWin, finishedAt]
  );

  const id = result.insertId;

  const [rows] = await pool.query<(DbGame & RowDataPacket)[]>(
    "SELECT * FROM games WHERE id = ?",
    [id]
  );

  return rows[0];
};

export const getGamesForUser = async (userId: number): Promise<DbGame[]> => {
  const [rows] = await pool.query<(DbGame & RowDataPacket)[]>(
    "SELECT * FROM games WHERE user_id = ? ORDER BY finished_at DESC",
    [userId]
  );

  return rows;
};