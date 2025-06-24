// src/middlewares/authorize.middleware.ts
import { RequestHandler } from "express";

/**
 * Retorna um middleware que verifica se `req.user.role` está entre
 * as roles permitidas. Exemplo: authorize("admin", "manager").
 */
export const authorize = (...allowedRoles: string[]): RequestHandler => {
  return (req, res, next) => {
    const userRole = req.user?.role;
    if (!userRole || !allowedRoles.includes(userRole)) {
      res.status(403).json({ message: "Acesso negado" });
      return;
    }
    next();
  };
};
