// src/validations/address.validation.ts
import * as yup from "yup";
import { Types } from "mongoose";

export const createAddressSchema = yup.object({
  street: yup.string().required("Rua é obrigatória"),
  city: yup.string().required("Cidade é obrigatória"),
  state: yup.string().required("Estado é obrigatório"),
  zipCode: yup
    .string()
    .required("CEP é obrigatório")
    .matches(/^\d{5}-?\d{3}$/, "CEP inválido (ex: 12345-678)"),
  user: yup
    .string()
    .nullable()
    .test("is-valid-objectid", "User inválido", (value) =>
      !value ? true : Types.ObjectId.isValid(value)
    ),
});

export const updateAddressSchema = yup.object({
  street: yup.string().optional(),
  city: yup.string().optional(),
  state: yup.string().optional(),
  zipCode: yup
    .string()
    .optional()
    .matches(/^\d{5}-?\d{3}$/, "CEP inválido"),
  user: yup
    .string()
    .optional()
    .test("is-valid-objectid", "User inválido", (value) =>
      !value ? true : Types.ObjectId.isValid(value)
    ),
});
