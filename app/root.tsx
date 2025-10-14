import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "react-router";
import { useEffect } from "react";
import { DarkThemeToggle } from "flowbite-react";


import type { Route } from "./+types/root";
import "./app.css";
import { ApiProvider } from "~/context/ApiContext";
import ThemeToggle from "~/components/ui/ThemeToggle";
import UserMenu from "~/components/ui/UserMenu";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Script inicial para aplicar el tema antes de cargar estilos (evita FOUC) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => {
  try {
    const path = window.location.pathname || "/";
    const allowDark = /^\/(admin|empresa|login)(\/|$)/.test(path);
    // Flowbite usa 'color-theme'; migramos desde 'theme' si existiera
    let stored = localStorage.getItem('color-theme');
    const legacy = localStorage.getItem('theme');
    if (!stored && (legacy === 'dark' || legacy === 'light')) {
      try { localStorage.setItem('color-theme', legacy); localStorage.removeItem('theme'); } catch {}
      stored = legacy;
    }
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const root = document.documentElement;
    if (!allowDark) {
      root.classList.remove('dark');
    } else if (stored === 'dark') {
      root.classList.add('dark');
    } else if (stored === 'light') {
      root.classList.remove('dark');
    } else {
      root.classList.toggle('dark', mql.matches);
    }
  } catch {}
})();`,
          }}
        />
        <Meta />
        <Links />
      </head>
      <body suppressHydrationWarning>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const location = useLocation();
  const allowDark = /^\/(admin|empresa|login)(\/|$)/.test(location.pathname);
  // En navegaciones cliente, forzar claro fuera de dashboards
  useEffect(() => {
    const root = document.documentElement;
    if (!allowDark) {
      root.classList.remove("dark");
    } else {
      try {
        let stored = localStorage.getItem("color-theme");
        const legacy = localStorage.getItem("theme");
        if (!stored && (legacy === "dark" || legacy === "light")) {
          try { localStorage.setItem("color-theme", legacy); localStorage.removeItem("theme"); } catch {}
          stored = legacy;
        }
        const mql = window.matchMedia("(prefers-color-scheme: dark)");
        if (stored === "dark") {
          root.classList.add("dark");
        } else if (stored === "light") {
          root.classList.remove("dark");
        } else {
          root.classList.toggle("dark", mql.matches);
        }
      } catch {}
    }
  }, [allowDark, location.pathname]);
  return (
		<ApiProvider>
			{/* Toggle de tema solo en dashboards */}
			{allowDark && (
				<div className="fixed right-4 top-4 z-50">
					<DarkThemeToggle />
				</div>
			)}
			{/* Menú de usuario con botón de cerrar sesión (dentro del Provider) */}
			<UserMenu />
			<Outlet />
		</ApiProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
