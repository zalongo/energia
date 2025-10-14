import type { Route } from "./+types/empresa";
import { Card } from "flowbite-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Panel Empresa | SIBNE" },
    { name: "description", content: "Panel para empresas" },
  ];
}

export default function EmpresaDashboard() {
  return (
    <main className="container p-4 bg-app text-app min-h-[60vh]">
      <h1 className="text-2xl font-semibold mb-4 text-app">Panel de Empresa</h1>
      <Card className="bg-card">
        <p>Contenido del panel de empresa (provisorio).</p>
      </Card>
    </main>
  );
}
