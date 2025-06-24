import { request } from "./api";

export async function login(email: string, password: string) {
  const res = await request("/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  const { token } = await res.json();
  return token;
}
