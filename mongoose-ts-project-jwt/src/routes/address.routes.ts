// src/routes/address.routes.ts
import { Router } from "express";
import * as AddressController from "../controllers/address.controller";

const router = Router();

router.post("/", AddressController.create);
router.get("/", AddressController.getAll);
router.get("/:id", AddressController.getById);
router.put("/:id", AddressController.update);
router.delete("/:id", AddressController.remove);

export default router;
