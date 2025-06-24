// src/controllers/userProject.controller.ts
import { Request, Response, NextFunction, RequestHandler } from "express";
import * as UserProjectService from "../services/userProject.service";
import {
  createUserProjectSchema,
  updateUserProjectSchema,
} from "../validations/userProject.validation";
import * as yup from "yup";

export const create: RequestHandler = async (req, res, next) => {
  try {
    await createUserProjectSchema.validate(req.body, { abortEarly: false });
    const userProject = await UserProjectService.createUserProject(req.body);
    res.status(201).json(userProject);
    return;
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      const errors = err.inner.map((e) => ({
        path: e.path,
        message: e.message,
      }));
      res.status(400).json({ errors });
      return;
    }

    const anyErr = err as any;
    if (anyErr.code === 11000) {
      res.status(409).json({ message: "Associação usuário+projeto já existe" });
      return;
    }

    next(err);
    return;
  }
};

export const getAll: RequestHandler = async (_req, res, next) => {
  try {
    const ups = await UserProjectService.getUserProjects();
    res.json(ups);
    return;
  } catch (err) {
    next(err);
    return;
  }
};

export const getById: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const up = await UserProjectService.getUserProjectById(id);
    if (!up) {
      res.status(404).json({ message: "UserProject não encontrado" });
      return;
    }
    res.json(up);
    return;
  } catch (err) {
    next(err);
    return;
  }
};

export const update: RequestHandler = async (req, res, next) => {
  try {
    await updateUserProjectSchema.validate(req.body, { abortEarly: false });
    const { id } = req.params;
    const updated = await UserProjectService.updateUserProject(id, req.body);
    if (!updated) {
      res.status(404).json({ message: "UserProject não encontrado" });
      return;
    }
    res.json(updated);
    return;
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      const errors = err.inner.map((e) => ({
        path: e.path,
        message: e.message,
      }));
      res.status(400).json({ errors });
      return;
    }
    next(err);
    return;
  }
};

export const remove: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await UserProjectService.deleteUserProject(id);
    if (!deleted) {
      res.status(404).json({ message: "UserProject não encontrado" });
      return;
    }
    res.status(204).send();
    return;
  } catch (err) {
    next(err);
    return;
  }
};
