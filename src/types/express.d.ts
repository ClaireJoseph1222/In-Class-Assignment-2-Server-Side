import "express";
import type { AuthTokenPayload } from "./auth";

declare module "express" {
  export interface Request {
    user?: AuthTokenPayload;
  }
}