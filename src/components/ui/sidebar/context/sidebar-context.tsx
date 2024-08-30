import {
	createContext,
	useState,
	type Dispatch,
	type ReactNode,
	type SetStateAction,
} from "react"

type SidebarContextProps = {
	expanded: boolean
	setExpanded: Dispatch<SetStateAction<boolean>>
} | null

export const SidebarContext = createContext<SidebarContextProps>(null)

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
	const savedExp = JSON.parse(localStorage.getItem("sidebar") || "true")

	const [expanded, setExpanded] = useState<boolean>(savedExp)

	return (
		<SidebarContext.Provider value={{ expanded, setExpanded }}>
			{children}
		</SidebarContext.Provider>
	)
}
