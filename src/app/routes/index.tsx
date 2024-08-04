import { ProtectedRoute } from "@/features/auth/components/protected-route"
import { createBrowserRouter, Outlet } from "react-router-dom"
import AppRoot from "./app/app-root"
import RedirectIfAuthenticated from "@/features/auth/components/redirect-If-authenticated"

export const createRouter = () => {
	return createBrowserRouter([
		{
			path: "/",
			lazy: async () => {
				const { LandingRoute } = await import("./landing")
				return { Component: LandingRoute }
			},
		},
		{
			path: "/auth",
			element: (
				<RedirectIfAuthenticated>
					<Outlet />
				</RedirectIfAuthenticated>
			),
			children: [
				{
					path: "register",
					lazy: async () => {
						const { RegisterRoute } = await import("./app/auth/register-route")
						return { Component: RegisterRoute }
					},
				},
				{
					path: "login",
					lazy: async () => {
						const { LoginRoute } = await import("./app/auth/login-route")
						return { Component: LoginRoute }
					},
				},
			],
		},
		{
			path: "*",
			lazy: async () => {
				const { NotFoundRoute } = await import("./not-found")
				return { Component: NotFoundRoute }
			},
		},
		{
			path: "/app",
			element: (
				<ProtectedRoute>
					<AppRoot />
				</ProtectedRoute>
			),
			children: [
				{
					path: "",
					lazy: async () => {
						const { RecommendationsRoute } = await import(
							"./app/recommendations-route"
						)
						return { Component: RecommendationsRoute }
					},
				},
				{
					path: "search",
					lazy: async () => {
						const { SearchRoute } = await import("./app/search-route")
						return { Component: SearchRoute }
					},
				},
			],
		},
	])
}
