import { request } from "./api";

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

export async function getUsers(): Promise<User[]> {
  const res = await request("/", { method: "GET" });
  return res.json();
}

export async function getUserById(id: string): Promise<User> {
  const res = await request(`/${id}`, { method: "GET" });
  return res.json();
}

export async function createUser(data: Omit<User, "_id">): Promise<User> {
  const res = await request("/", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateUser(
  id: string,
  data: Partial<Omit<User, "_id">>
): Promise<User> {
  const res = await request(`/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteUser(id: string): Promise<void> {
  await request(`/${id}`, { method: "DELETE" });
}
