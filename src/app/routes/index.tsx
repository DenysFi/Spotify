import { ProtectedRoute } from "@/features/auth/components/protected-route";
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import AppRoot from "./app/app-root";
import RedirectIfAuthenticated from "@/features/auth/components/redirect-If-authenticated";

export const createRouter = () => {
  return createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/auth/login" replace />,
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
            const { RegisterRoute } = await import("./app/auth/register-route");
            return { Component: RegisterRoute };
          },
        },
        {
          path: "login",
          lazy: async () => {
            const { LoginRoute } = await import("./app/auth/login-route");
            return { Component: LoginRoute };
          },
        },
      ],
    },
    {
      path: "*",
      lazy: async () => {
        const { NotFoundRoute } = await import("./not-found");
        return { Component: NotFoundRoute };
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
            );
            return { Component: RecommendationsRoute };
          },
        },
        {
          path: "search",
          lazy: async () => {
            const { SearchRoute } = await import("./app/search/search-route");
            return { Component: SearchRoute };
          },
          children: [
            {
              path: "",
              element: <div>Search</div>,
              // lazy: async () => {
              // 	const { RecommendationsRoute } = await import(
              // 		"./app/recommendations-route"
              // 	)
              // 	return { Component: <div>Search</div> }
              // },
            },
            {
              path: ":query",
              lazy: async () => {
                const { SearchQueryRoute } = await import(
                  "./app/search/search-query-route"
                );
                return { Component: SearchQueryRoute };
              },
            },
          ],
        },
        {
          path: "playlist/:playlistId",
          lazy: async () => {
            const { PlaylistRoute } = await import("./app/playlist-route");
            return { Component: PlaylistRoute };
          },
        },
        {
          path: "album/:albumId",
          lazy: async () => {
            const { AlbumRoute } = await import("./app/album-route");
            return { Component: AlbumRoute };
          },
        },
        {
          path: "artist/:artistId",
          lazy: async () => {
            const { ArtistRoute } = await import("./app/artist-route");
            return { Component: ArtistRoute };
          },
        },
        {
          path: "tetris",
          lazy: async () => {
            const { TetrisRoute } = await import("./app/tetris-route");
            return { Component: TetrisRoute };
          },
        },
      ],
    },
  ]);
};
