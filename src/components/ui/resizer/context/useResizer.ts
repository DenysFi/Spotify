import { useContext } from "react"
import { ResizerContext } from "./resizer-context"

export function useResizer() {
	const context = useContext(ResizerContext)

	if (!context) {
		throw new Error("useResizer must be used within a SidebarProvider")
	}

	return context
}
