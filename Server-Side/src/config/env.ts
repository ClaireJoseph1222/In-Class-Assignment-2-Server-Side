import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT ?? 4000),
  dbHost: process.env.DB_HOST ?? "localhost",
  dbUser: process.env.DB_USER ?? "root",
  dbPassword: process.env.DB_PASSWORD ?? "",
  dbName: process.env.DB_NAME ?? "war_game",
  jwtSecret: process.env.JWT_SECRET ?? "dev-secret",
};
