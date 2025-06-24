// src/services/project.service.ts
import { ProjectModel, IProject } from "../models/project.model";

export const createProject = async (
  data: Partial<IProject>
): Promise<IProject> => {
  const project = new ProjectModel(data);
  return await project.save();
};

export const getProjects = async (): Promise<IProject[]> => {
  return await ProjectModel.find();
};

export const getProjectById = async (id: string): Promise<IProject | null> => {
  return await ProjectModel.findById(id);
};

export const updateProject = async (
  id: string,
  data: Partial<IProject>
): Promise<IProject | null> => {
  return await ProjectModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const deleteProject = async (id: string): Promise<IProject | null> => {
  return await ProjectModel.findByIdAndDelete(id);
};
