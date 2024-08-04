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
}

export const SidebarContext = createContext<SidebarContextProps>({
	expanded: true,
	setExpanded: () => {},
})

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
	const [expanded, setExpanded] = useState(true)

	return (
		<SidebarContext.Provider value={{ expanded, setExpanded }}>
			{children}
		</SidebarContext.Provider>
	)
}
