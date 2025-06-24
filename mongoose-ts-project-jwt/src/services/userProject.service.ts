// src/services/userProject.service.ts
import { UserProjectModel, IUserProject } from "../models/userProject.model";

export const createUserProject = async (
  data: Partial<IUserProject>
): Promise<IUserProject> => {
  const userProject = new UserProjectModel(data);
  return await userProject.save();
};

export const getUserProjects = async (): Promise<IUserProject[]> => {
  return await UserProjectModel.find()
    .populate("user", "name email")
    .populate("project", "name");
};

export const getUserProjectById = async (
  id: string
): Promise<IUserProject | null> => {
  return await UserProjectModel.findById(id)
    .populate("user", "name email")
    .populate("project", "name");
};

export const updateUserProject = async (
  id: string,
  data: Partial<IUserProject>
): Promise<IUserProject | null> => {
  return await UserProjectModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  })
    .populate("user", "name email")
    .populate("project", "name");
};

export const deleteUserProject = async (
  id: string
): Promise<IUserProject | null> => {
  return await UserProjectModel.findByIdAndDelete(id);
};
