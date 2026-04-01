import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT ?? 7000),
  dbHost: process.env.DB_HOST ?? "localhost",
  dbPort: Number(process.env.DB_PORT ?? 5432),
  dbUser: process.env.DB_USER ?? "war_user",
  dbPassword: process.env.DB_PASSWORD ?? "war_password",
  dbName: process.env.DB_NAME ?? "war_db",
  jwtSecret: process.env.JWT_SECRET ?? "change_me"
};