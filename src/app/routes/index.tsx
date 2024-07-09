import { createBrowserRouter } from "react-router-dom"

export const createRouter = () => {
    return createBrowserRouter([
        {
            path: '/',
            lazy: async () => {
                const { LandingRoute } = await import('./landing');
                return { Component: LandingRoute };
            },
        },
        {
            path: '/register',
            lazy: async () => {
                const { RegisterRoute } = await import('./app/auth/register-route');
                return { Component: RegisterRoute };
            },
        },
        {
            path: '/login',
            lazy: async () => {
                const { LoginRoute } = await import('./app/auth/login-route');
                return { Component: LoginRoute };
            },
        },
        {
            path: '*',
            lazy: async () => {
                const { NotFoundRoute } = await import('./not-found');
                return { Component: NotFoundRoute };
            }
        }

    ])
}