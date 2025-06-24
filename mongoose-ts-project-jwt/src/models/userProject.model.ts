// src/models/userProject.model.ts
import { Schema, model, Document, Types } from "mongoose";

export interface IUserProject extends Document {
  user: Types.ObjectId;
  project: Types.ObjectId;
  role?: string; // ex.: "developer", "manager", etc.
  assignedAt: Date;
}

const UserProjectSchema = new Schema<IUserProject>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    role: { type: String },
    assignedAt: { type: Date, default: () => new Date() },
  },
  {
    timestamps: true,
  }
);

// Definimos o índice único após criar o schema:
UserProjectSchema.index(
  { user: 1, project: 1 },
  { unique: true, name: "user_project_unique" }
);

export const UserProjectModel = model<IUserProject>(
  "UserProject",
  UserProjectSchema
);
