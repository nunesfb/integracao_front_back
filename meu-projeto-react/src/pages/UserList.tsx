import { useEffect, useState } from "react";
import { type User, getUsers, deleteUser } from "../services/user";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const data = await getUsers();
    setUsers(data);
  }

  async function handleDelete(id: string) {
    if (confirm("Confirma exclusão?")) {
      await deleteUser(id);
      load();
    }
  }

  return (
    <div className="container">
      <h1>Usuários</h1>
      <button onClick={() => logout()}>Logout</button>
      <button onClick={() => navigate("/users/create")}>Novo Usuário</button>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Role</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button onClick={() => navigate(`/users/edit/${u._id}`)}>
                  Editar
                </button>
                <button onClick={() => handleDelete(u._id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
