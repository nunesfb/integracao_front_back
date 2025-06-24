// src/validations/user.validation.ts
import * as yup from "yup";

export const createUserSchema = yup.object({
  name: yup
    .string()
    .required("Nome é obrigatório")
    .min(2, "Nome deve ter ao menos 2 caracteres"),
  email: yup.string().required("Email é obrigatório").email("Email inválido"),
  password: yup
    .string()
    .required("Senha é obrigatória")
    .min(6, "Senha deve ter ao menos 6 caracteres"),
  role: yup
    .string()
    .oneOf(["user", "admin"], "Role inválida")
    .required("Role é obrigatória"),
});

export const updateUserSchema = yup.object({
  name: yup.string().optional().min(2, "Nome deve ter ao menos 2 caracteres"),
  email: yup.string().optional().email("Email inválido"),
  password: yup
    .string()
    .optional()
    .min(6, "Senha deve ter ao menos 6 caracteres"),
  role: yup.string().optional().oneOf(["user", "admin"], "Role inválida"),
});

export const loginSchema = yup.object({
  email: yup.string().required("Email é obrigatório").email("Email inválido"),
  password: yup.string().required("Senha é obrigatória"),
});
