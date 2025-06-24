// src/models/project.model.ts
import { Schema, model, Document, Types } from "mongoose";

export interface IProject extends Document {
  name: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  // Poderíamos adicionar outros campos (por ex., status, budget, etc.)
}

const ProjectSchema = new Schema<IProject>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
  },
  {
    timestamps: true,
  }
);

export const ProjectModel = model<IProject>("Project", ProjectSchema);
