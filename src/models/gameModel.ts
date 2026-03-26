import { getDbPool } from "../config/db";
import { DbGame } from "../types/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export const createGameRecord = async (
  userId: number,
  rounds: number,
  userWin: boolean,
  dateCompleted: Date,
): Promise<DbGame> => {
  const pool = getDbPool();

  const [result] = await pool.execute<ResultSetHeader>(
    "INSERT INTO game (date_completed, user_win, rounds, user_id) VALUES (?, ?, ?, ?)",
    [dateCompleted, userWin, rounds, userId],
  );

  const id = result.insertId;

  const [rows] = await pool.query<(DbGame & RowDataPacket)[]>(
    "SELECT * FROM game WHERE id = ?",
    [id],
  );

  const game = rows[0];
  if (!game) {
    throw new Error("Failed to create game record");
  }

  return game;
};

export const getGamesForUser = async (userId: number): Promise<DbGame[]> => {
  const pool = getDbPool();

  const [rows] = await pool.query<(DbGame & RowDataPacket)[]>(
    "SELECT * FROM game WHERE user_id = ? ORDER BY date_completed DESC",
    [userId],
  );

  return rows;
};
