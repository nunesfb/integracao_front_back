// src/validations/project.validation.ts
import * as yup from "yup";

export const createProjectSchema = yup.object({
  name: yup.string().required("Nome do projeto é obrigatório"),
  description: yup.string().optional(),
  startDate: yup.date().optional(),
  endDate: yup
    .date()
    .optional()
    .test(
      "end-after-start",
      "endDate deve ser posterior a startDate",
      function (value) {
        const { startDate } = this.parent;
        if (value && startDate) {
          return new Date(value) >= new Date(startDate);
        }
        return true;
      }
    ),
});

export const updateProjectSchema = yup.object({
  name: yup.string().optional(),
  description: yup.string().optional(),
  startDate: yup.date().optional(),
  endDate: yup
    .date()
    .optional()
    .test(
      "end-after-start",
      "endDate deve ser posterior a startDate",
      function (value) {
        const { startDate } = this.parent;
        if (value && startDate) {
          return new Date(value) >= new Date(startDate);
        }
        return true;
      }
    ),
});
