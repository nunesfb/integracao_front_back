// src/routes/project.routes.ts
import { Router } from "express";
import * as ProjectController from "../controllers/project.controller";

const router = Router();

router.post("/", ProjectController.create);
router.get("/", ProjectController.getAll);
router.get("/:id", ProjectController.getById);
router.put("/:id", ProjectController.update);
router.delete("/:id", ProjectController.remove);

export default router;
