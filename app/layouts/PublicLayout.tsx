import type { ReactNode } from "react";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-app text-app">
      <main className="container mx-auto p-4">{children}</main>
    </div>
  );
}
