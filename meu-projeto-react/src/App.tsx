import React, { type ReactNode } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import UserList from "./pages/UserList";
import UserForm from "./pages/UserForm";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

function PrivateRoute({ children }: { children: ReactNode }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <UserList />
            </PrivateRoute>
          }
        />
        <Route
          path="/users/create"
          element={
            <PrivateRoute>
              <UserForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/users/edit/:id"
          element={
            <PrivateRoute>
              <UserForm />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/users" />} />
      </Routes>
    </AuthProvider>
  );
}
