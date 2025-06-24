// src/controllers/project.controller.ts
import { RequestHandler } from "express";
import * as ProjectService from "../services/project.service";
import {
  createProjectSchema,
  updateProjectSchema,
} from "../validations/project.validation";
import * as yup from "yup";

export const create: RequestHandler = async (req, res, next) => {
  try {
    await createProjectSchema.validate(req.body, { abortEarly: false });
    const project = await ProjectService.createProject(req.body);
    res.status(201).json(project);
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
  }
};

export const getAll: RequestHandler = async (_req, res, next) => {
  try {
    const projects = await ProjectService.getProjects();
    res.json(projects);
    return;
  } catch (err) {
    next(err);
  }
};

export const getById: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await ProjectService.getProjectById(id);
    if (!project) {
      res.status(404).json({ message: "Project não encontrado" });
      return;
    }
    res.json(project);
    return;
  } catch (err) {
    next(err);
  }
};

export const update: RequestHandler = async (req, res, next) => {
  try {
    await updateProjectSchema.validate(req.body, { abortEarly: false });
    const { id } = req.params;
    const updated = await ProjectService.updateProject(id, req.body);
    if (!updated) {
      res.status(404).json({ message: "Project não encontrado" });
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
  }
};

export const remove: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await ProjectService.deleteProject(id);
    if (!deleted) {
      res.status(404).json({ message: "Project não encontrado" });
      return;
    }
    res.status(204).send();
    return;
  } catch (err) {
    next(err);
  }
};
