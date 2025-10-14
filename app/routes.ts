import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),
	route("/login", "routes/login.tsx"),
	// Rutas de dashboards (provisorias): reutilizamos home.tsx hasta crear vistas específicas
	route("/admin", "routes/admin.tsx"),
	route("/empresa", "routes/empresa.tsx"),
	route("/not-authorized", "routes/not-authorized.tsx"),
] satisfies RouteConfig;
