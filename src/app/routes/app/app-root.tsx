import MainErrorFallback from "@/components/errors/main-error-falback"
import AppLayout from "@/components/layouts/app-layout"
import Spinner from "@/components/ui/spinner/spinner"

import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"

import { Outlet } from "react-router-dom"

function AppRoot() {
	return (
		<AppLayout>
			<Suspense
				fallback={
					<div className="flex size-full items-center justify-center">
						<Spinner size="lg" />
					</div>
				}
			>
				<Outlet />
			</Suspense>
		</AppLayout>
	)
}

export default AppRoot
