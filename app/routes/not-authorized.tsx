import type { Route } from "./+types/not-authorized";
import { Card, Alert, Button } from "flowbite-react";
import { useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "No Autorizado | SIBNE" },
    { name: "description", content: "Acceso no autorizado" },
  ];
}

export default function NotAuthorized() {
  const navigate = useNavigate();
  return (
    <main className="container p-4">
      <Card>
        <Alert color="warning" withBorderAccent>
          No tienes permisos para acceder a esta página.
        </Alert>
        <div className="mt-4 flex gap-2">
          <Button color="gray" onClick={() => navigate(-1)}>Volver</Button>
          <Button onClick={() => navigate("/")}>Ir al inicio</Button>
        </div>
      </Card>
    </main>
  );
}
