import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	// route("routes/home.tsx"),
	index("routes/login.tsx"),
	route("/admin", "routes/admin.tsx"),
	route("/user", "routes/user.tsx"),
	route("/supervisor", "routes/supervisor.tsx"),
	route("/not-authorized", "routes/not-authorized.tsx"),
] satisfies RouteConfig;
