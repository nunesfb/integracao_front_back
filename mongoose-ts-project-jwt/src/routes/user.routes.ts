// src/routes/user.routes.ts
import { Router } from "express";
import * as UserController from "../controllers/user.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/authorize.middleware";

const router = Router();

// Cadastro (público)
router.post("/", UserController.create);

// Login (público)
router.post("/login", UserController.login);

// A partir daqui, rotas só para usuários autenticados
router.use(authenticate);

// Listar todos (apenas ADMIN)
router.get("/", authorize("admin"), UserController.getAll);

// Buscar por ID (autenticado, mas só o próprio usuário ou ADMIN)
router.get(
  "/:id",
  (req, res, next) => {
    // Só permite acessar se for o próprio usuário ou admin
    if (req.user!.id !== req.params.id && req.user!.role !== "admin") {
      res.status(403).json({ message: "Acesso negado" });
      return;
    }
    next();
  },
  UserController.getById
);

// Atualizar (próprio usuário ou ADMIN)
router.put(
  "/:id",
  (req, res, next) => {
    if (req.user!.id !== req.params.id && req.user!.role !== "admin") {
      res.status(403).json({ message: "Acesso negado" });
      return;
    }
    next();
  },
  UserController.update
);

// Deletar (apenas ADMIN)
router.delete("/:id", authorize("admin"), UserController.remove);

export default router;
