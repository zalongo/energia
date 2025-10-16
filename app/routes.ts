import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	// route("routes/home.tsx"),
	index("routes/login.tsx"),
	route("/admin", "routes/admin.tsx"),
	route("/empresa", "routes/empresa.tsx"),
	route("/not-authorized", "routes/not-authorized.tsx"),
] satisfies RouteConfig;
