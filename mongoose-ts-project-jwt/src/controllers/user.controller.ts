// src/controllers/user.controller.ts
import { RequestHandler } from "express";
import * as UserService from "../services/user.service";
import {
  createUserSchema,
  updateUserSchema,
  loginSchema,
} from "../validations/user.validation";
import * as yup from "yup";
import * as jwt from "jsonwebtoken"; // importar como namespace

// Pegue do .env a chave secreta e o tempo de expiração
const JWT_SECRET = process.env.JWT_SECRET || "changeme";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

interface JwtPayload {
  sub: string;
  role: string;
}

export const create: RequestHandler = async (req, res, next) => {
  try {
    await createUserSchema.validate(req.body, { abortEarly: false });
    const { name, email, password, role } = req.body;
    const existing = await UserService.getUserByEmail(email);
    if (existing) {
      res.status(409).json({ message: "Email já cadastrado" });
      return;
    }
    const user = await UserService.createUser({ name, email, password, role });
    const { password: _, ...rest } = user.toObject();
    res.status(201).json(rest);
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

export const login: RequestHandler = async (req, res, next) => {
  try {
    await loginSchema.validate(req.body, { abortEarly: false });
    const { email, password } = req.body;
    const user = await UserService.getUserByEmail(email);
    if (!user) {
      res.status(401).json({ message: "Credenciais inválidas" });
      return;
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({ message: "Credenciais inválidas" });
      return;
    }
    // Gera o token
    const userId = (user._id as any).toString(); // cast porque _id é unknown
    const payload: JwtPayload = {
      sub: userId,
      role: user.role,
    };
    const token = jwt.sign(payload, JWT_SECRET as jwt.Secret, {
      expiresIn: JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
    });
    res.json({ token });
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

export const getAll: RequestHandler = async (_req, res, next) => {
  try {
    const users = await UserService.getUsers();
    const sanitized = users.map((u) => {
      const obj = u.toObject();
      delete obj.password;
      return obj;
    });
    res.json(sanitized);
    return;
  } catch (err) {
    next(err);
    return;
  }
};

export const getById: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await UserService.getUserById(id);
    if (!user) {
      res.status(404).json({ message: "Usuário não encontrado" });
      return;
    }
    const obj = user.toObject();
    delete obj.password;
    res.json(obj);
    return;
  } catch (err) {
    next(err);
    return;
  }
};

export const update: RequestHandler = async (req, res, next) => {
  try {
    await updateUserSchema.validate(req.body, { abortEarly: false });
    const { id } = req.params;
    const updated = await UserService.updateUser(id, req.body);
    if (!updated) {
      res.status(404).json({ message: "Usuário não encontrado" });
      return;
    }
    const obj = updated.toObject();
    delete obj.password;
    res.json(obj);
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
    const deleted = await UserService.deleteUser(id);
    if (!deleted) {
      res.status(404).json({ message: "Usuário não encontrado" });
      return;
    }
    res.status(204).send();
    return;
  } catch (err) {
    next(err);
    return;
  }
};
