import { Button } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useApi } from "~/context/ApiContext";

export default function UserMenu() {
  const { user, logout } = useApi();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      navigate("/login", { replace: true });
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="fixed right-4 top-16 z-50 flex items-center gap-2">
      <span className="text-sm opacity-80 hidden sm:inline">
        {user.nombre ?? user.userName}
      </span>
      <Button
        size="sm"
        color="failure"
        onClick={handleLogout}
        disabled={isLoggingOut}
        data-testid="logout-button"
        className="text-white bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 border border-red-600 dark:border-red-500 focus:ring-red-500"
        aria-label="Cerrar sesión"
      >
        {isLoggingOut ? "Cerrando…" : "Cerrar sesión"}
      </Button>
    </div>
  );
}
