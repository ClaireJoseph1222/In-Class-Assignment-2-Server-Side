import mysql, { Pool } from "mysql2/promise";
import { env } from "./env";

let pool: Pool | null = null;

export const getDbPool = (): Pool => {
  if (pool === null) {
    pool = mysql.createPool({
      host: env.dbHost,
      user: env.dbUser,
      password: env.dbPassword,
      database: env.dbName,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  return pool;
};
