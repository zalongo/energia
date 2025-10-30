import type { ReactNode } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Alert } from "flowbite-react";
import { useApi } from "~/context/ApiContext";
import Loading from "~/components/ui/Loading";
import AccessDenied from "~/components/ui/AccessDenied";

export default function AdminLayout({ children }: { children: ReactNode }) {
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
    return <Loading />;
  }

  if (!user || !hasRole("Administrador")) {
    return <AccessDenied />;
  }

  return (
    <div className="min-h-screen bg-app text-app">
      <main className="container mx-auto p-4">{children}</main>
    </div>
  );
}
