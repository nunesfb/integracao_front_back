// src/middlewares/auth.middleware.ts
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "changeme";

interface JwtPayload {
  sub: string;
  role: string;
  iat: number;
  exp: number;
}

// Acrescentamos no Request um campo `user`
declare module "express-serve-static-core" {
  interface Request {
    user?: {
      id: string;
      role: string;
    };
  }
}

export const authenticate: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ message: "Token ausente ou inválido" });
    return;
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = {
      id: payload.sub,
      role: payload.role,
    };
    next();
  } catch {
    res.status(401).json({ message: "Token inválido ou expirado" });
  }
};
