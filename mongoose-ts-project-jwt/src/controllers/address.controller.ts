// src/controllers/address.controller.ts
import { Request, Response, NextFunction, RequestHandler } from "express";
import * as AddressService from "../services/address.service";
import {
  createAddressSchema,
  updateAddressSchema,
} from "../validations/address.validation";
import * as yup from "yup";

export const create: RequestHandler = async (req, res, next) => {
  try {
    await createAddressSchema.validate(req.body, { abortEarly: false });
    const address = await AddressService.createAddress(req.body);
    res.status(201).json(address);
    return; // garante que retornamos void
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
    const addresses = await AddressService.getAddresses();
    res.json(addresses);
    return;
  } catch (err) {
    next(err);
  }
};

export const getById: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const address = await AddressService.getAddressById(id);
    if (!address) {
      res.status(404).json({ message: "Address não encontrado" });
      return;
    }
    res.json(address);
    return;
  } catch (err) {
    next(err);
  }
};

export const update: RequestHandler = async (req, res, next) => {
  try {
    await updateAddressSchema.validate(req.body, { abortEarly: false });
    const { id } = req.params;
    const updated = await AddressService.updateAddress(id, req.body);
    if (!updated) {
      res.status(404).json({ message: "Address não encontrado" });
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
    const deleted = await AddressService.deleteAddress(id);
    if (!deleted) {
      res.status(404).json({ message: "Address não encontrado" });
      return;
    }
    res.status(204).send();
    return;
  } catch (err) {
    next(err);
  }
};
