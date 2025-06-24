// src/validations/userProject.validation.ts
import * as yup from "yup";
import { Types } from "mongoose";

export const createUserProjectSchema = yup.object({
  user: yup
    .string()
    .required("User é obrigatório")
    .test("is-valid-objectid", "User inválido", (value) =>
      Types.ObjectId.isValid(value)
    ),
  project: yup
    .string()
    .required("Project é obrigatório")
    .test("is-valid-objectid", "Project inválido", (value) =>
      Types.ObjectId.isValid(value)
    ),
  role: yup.string().optional(),
  assignedAt: yup.date().optional(),
});

export const updateUserProjectSchema = yup.object({
  role: yup.string().optional(),
  assignedAt: yup.date().optional(),
});
