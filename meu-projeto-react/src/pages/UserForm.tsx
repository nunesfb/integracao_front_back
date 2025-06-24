import React, { useState, useEffect } from "react";
import { createUser, getUserById, updateUser } from "../services/user";
import { useNavigate, useParams } from "react-router-dom";

export default function UserForm() {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"user" | "admin">("user");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit && id) {
      getUserById(id).then((u) => {
        setName(u.name);
        setEmail(u.email);
        setRole(u.role as "user" | "admin");
      });
    }
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (isEdit && id) {
        await updateUser(id, {
          name,
          email,
          password: password || undefined,
          role,
        });
      } else {
        await createUser({ name, email, password, role });
      }
      navigate("/users");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    }
  }

  return (
    <div className="container">
      <h1>{isEdit ? "Editar" : "Novo"} Usuário</h1>
      <form onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}
        <label>
          Nome
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            minLength={2}
          />
        </label>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          {isEdit ? "Nova senha (opcional)" : "Senha"}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
          />
        </label>
        <label>
          Role
          <select
            value={role}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setRole(e.target.value as "user" | "admin")
            }
          >
            <option value="user">Usuário</option>
            <option value="admin">Admin</option>
          </select>
        </label>

        <button type="submit">Salvar</button>
        <button type="button" onClick={() => navigate("/users")}>
          Cancelar
        </button>
      </form>
    </div>
  );
}
