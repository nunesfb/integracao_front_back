// src/services/user.service.ts
import { UserModel, IUser } from "../models/user.model";

export const createUser = async (
  data: Pick<IUser, "name" | "email" | "password" | "role">
): Promise<IUser> => {
  const user = new UserModel(data);
  return await user.save();
};

export const getUsers = async (): Promise<IUser[]> => {
  return await UserModel.find();
};

export const getUserById = async (id: string): Promise<IUser | null> => {
  return await UserModel.findById(id);
};

export const getUserByEmail = async (email: string): Promise<IUser | null> => {
  return await UserModel.findOne({ email });
};

export const updateUser = async (
  id: string,
  data: Partial<Pick<IUser, "name" | "email" | "password" | "role">>
): Promise<IUser | null> => {
  // findByIdAndUpdate não dispara pre("save"), então, se for alterar password, é melhor buscar e salvar:
  const user = await UserModel.findById(id);
  if (!user) return null;

  if (data.name !== undefined) user.name = data.name;
  if (data.email !== undefined) user.email = data.email;
  if (data.role !== undefined) user.role = data.role;
  if (data.password !== undefined) user.password = data.password; // vai disparar pre("save")

  return user.save();
};

export const deleteUser = async (id: string): Promise<IUser | null> => {
  return await UserModel.findByIdAndDelete(id);
};
