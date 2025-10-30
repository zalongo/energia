import type { ReactNode } from "react";
import { Card } from "flowbite-react";

export default function Loading({
  message = "Cargando...",
  children,
}: {
  message?: string;
  children?: ReactNode;
}) {
  return (
    <main className="container p-4 bg-app text-app min-h-[60vh]">
      <Card className="bg-card">
        <p>{message}</p>
        {children}
      </Card>
    </main>
  );
}
