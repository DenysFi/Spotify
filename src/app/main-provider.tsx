import MainErrorFallback from "@/components/errors/main-error-falback"
import AuthProvider from "@/features/auth/context/auth-context"
import { queryClient } from "@/lib/client-query"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import React from "react"
import { ErrorBoundary } from "react-error-boundary"
import { HelmetProvider } from "react-helmet-async"

function AppProvider({ children }: { children: React.ReactNode }) {
	return (
		<React.Suspense>
			<ErrorBoundary fallback={<MainErrorFallback />}>
				<HelmetProvider>
					<QueryClientProvider client={queryClient}>
						<ReactQueryDevtools />
						<AuthProvider>{children}</AuthProvider>
					</QueryClientProvider>
				</HelmetProvider>
			</ErrorBoundary>
		</React.Suspense>
	)
}
export default AppProvider
