import type { Route } from "./+types/admin";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Alert, Card } from "flowbite-react";
import { useApi } from "~/context/ApiContext";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Panel Admin | SIBNE" },
    { name: "description", content: "Panel de administración" },
  ];
}

export default function AdminDashboard() {
  const { user, loading, hasRole } = useApi();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate("/login", { replace: true });
      return;
    }
    if (!hasRole("Administrador")) {
      navigate("/not-authorized", { replace: true });
    }
  }, [user, loading, hasRole, navigate]);

  if (loading) {
    return (
      <main className="container p-4 bg-app text-app min-h-[60vh]">
        <Card className="bg-card">
          <p>Cargando...</p>
        </Card>
      </main>
    );
  }

  if (!user || !hasRole("Administrador")) {
    return (
      <main className="container p-4 bg-app text-app min-h-[60vh]">
        <Alert color="failure">Acceso denegado.</Alert>
      </main>
    );
  }

  return (
    <main className="container p-4 bg-app text-app min-h-[60vh]">
      <h1 className="text-2xl font-semibold mb-4 text-app">Panel de Administración</h1>
      <Card className="bg-card">
        <p>Bienvenido, {user.nombre ?? user.userName}</p>
      </Card>
    </main>
  );
}
