// src/routes/userProject.routes.ts
import { Router } from "express";
import * as UserProjectController from "../controllers/userProject.controller";

const router = Router();

router.post("/", UserProjectController.create);
router.get("/", UserProjectController.getAll);
router.get("/:id", UserProjectController.getById);
router.put("/:id", UserProjectController.update);
router.delete("/:id", UserProjectController.remove);

export default router;
