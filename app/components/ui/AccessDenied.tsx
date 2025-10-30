import { Alert } from "flowbite-react";

export default function AccessDenied({
  message = "Acceso denegado.",
}: {
  message?: string;
}) {
  return (
    <main className="container p-4 bg-app text-app min-h-[60vh]">
      <Alert color="failure">{message}</Alert>
    </main>
  );
}
