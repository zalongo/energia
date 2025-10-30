import type { Route } from "./+types/supervisor";
import { Card } from "flowbite-react";
import { useApi } from "~/context/ApiContext";
import SupervisorLayout from "~/layouts/SupervisorLayout";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Panel Supervisor | SIBNE" },
    { name: "description", content: "Panel para supervisores" },
  ];
}

export default function SupervisorDashboard() {
  const { user } = useApi();

  return (
    <SupervisorLayout>
      <main className="container p-4 bg-app text-app min-h-[60vh]">
        <h1 className="text-2xl font-semibold mb-4 text-app">Panel de Supervisor</h1>
        <Card className="bg-card">
          <p>Bienvenido, {user?.nombre ?? user?.userName}</p>
        </Card>
      </main>
    </SupervisorLayout>
  );
}
