import type { Route } from "./+types/user";
import { Card } from "flowbite-react";
import { useApi } from "~/context/ApiContext";
import UserLayout from "~/layouts/UserLayout";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "User Panel | SIBNE" },
    { name: "description", content: "User panel" },
  ];
}

export default function UserDashboard() {
  const { user } = useApi();

  return (
    <UserLayout>
      <main className="container p-4 bg-app text-app min-h-[60vh]">
        <h1 className="text-2xl font-semibold mb-4 text-app">User Panel</h1>
        <Card className="bg-card">
          <p>Bienvenido, {user?.nombre ?? user?.userName}</p>
        </Card>
      </main>
    </UserLayout>
  );
}
