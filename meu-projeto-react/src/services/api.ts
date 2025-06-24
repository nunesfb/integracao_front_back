const API_URL = import.meta.env.VITE_API_URL;

export async function request(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = localStorage.getItem("token");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  const res = await fetch(`${API_URL}/users${endpoint}`, {
    ...options,
    headers,
  });
  if (!res.ok) throw new Error(await res.text());
  return res;
}
