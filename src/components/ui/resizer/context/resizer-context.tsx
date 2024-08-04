import { createContext, type ReactNode } from "react"
import type { UseResizableProps, UseResizableReturnType } from "../useResizable"

type ResizerContextValueType =
	| (UseResizableProps &
			Omit<UseResizableReturnType, "contentRef" | "resizerRef">)
	| null

type ResizerContextProps = {
	children: ReactNode
	initial: ResizerContextValueType
}

export const ResizerContext = createContext<ResizerContextValueType>(null)

export const ResizerProvider = ({ children, initial }: ResizerContextProps) => {
	return (
		<ResizerContext.Provider value={initial}>
			{children}
		</ResizerContext.Provider>
	)
}
