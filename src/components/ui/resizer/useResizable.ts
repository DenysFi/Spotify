import {
	useCallback,
	useEffect,
	useState,
	type Dispatch,
	type SetStateAction,
} from "react"

type ElementRefProps = HTMLElement | null
type RefFunction = (nodeEle: ElementRefProps) => void

export type UseResizableReturnType = {
	contentRef: RefFunction
	resizerRef: RefFunction
	setCurrentWidth: Dispatch<SetStateAction<number>>
	setAnimation: Dispatch<SetStateAction<boolean>>
	isResizing: boolean
	currentWidth: number
	animation: boolean
}
export type UseResizableProps = {
	min: number
	max: number
	id?: string
	saveLastWidth?: boolean
	position?: "left" | "right"
}

export const useResizable = ({
	min,
	max,
	id = "resizerWidth",
	position = "right",
	saveLastWidth = true,
}: UseResizableProps): UseResizableReturnType => {
	const [contentNode, setContentNode] = useState<ElementRefProps>(null)
	const [resizeNode, setResizeNode] = useState<ElementRefProps>(null)
	const [isResizing, setIsResizing] = useState(false)
	const [animation, setAnimation] = useState(false)

	const savedWidth = localStorage.getItem(id)
	const [currentWidth, setCurrentWidth] = useState(() =>
		savedWidth && saveLastWidth ? parseInt(savedWidth) : min
	)

	const contentRef = useCallback((targetElement: ElementRefProps) => {
		setContentNode(targetElement)
	}, [])

	const resizerRef = useCallback((targetElement: ElementRefProps) => {
		setResizeNode(targetElement)
	}, [])

	const handleMouseDown = useCallback(
		(e: MouseEvent) => {
			if (!contentNode) return

			setIsResizing(true)

			document.body.style.setProperty("user-select", "none")
			document.body.style.setProperty("pointer-events", "none")

			document.head.style.setProperty("cursor", "grabbing")

			const x = e.clientX
			const styles = window.getComputedStyle(contentNode)
			const w = parseInt(styles.width, 10)

			const handleMouseMove = (e: MouseEvent) => {
				const dx = position === "right" ? e.clientX - x : x - e.clientX
				const newWidth = Math.max(min, Math.min(max, w + dx))
				setCurrentWidth(newWidth)
				saveLastWidth && localStorage.setItem(id, newWidth.toString())
			}

			const handleMouseUp = () => {
				document.removeEventListener("mousemove", handleMouseMove)
				document.removeEventListener("mouseup", handleMouseUp)

				resetState()
			}

			document.addEventListener("mousemove", handleMouseMove)
			document.addEventListener("mouseup", handleMouseUp)
		},
		[contentNode, id, max, min, saveLastWidth, position]
	)

	const resetState = () => {
		document.body.style.removeProperty("user-select")
		document.body.style.removeProperty("pointer-events")

		document.head.style.setProperty("cursor", "grabbing")

		setIsResizing(false)
	}

	useEffect(() => {
		contentNode?.setAttribute("style", `width: ${currentWidth}px; `)
	}, [currentWidth, contentNode])

	useEffect(() => {
		if (!resizeNode) return

		resizeNode.addEventListener("mousedown", handleMouseDown)

		return () => resizeNode.removeEventListener("mousedown", handleMouseDown)
	}, [handleMouseDown, resizeNode])

	return {
		currentWidth,
		contentRef,
		resizerRef,
		isResizing,
		setCurrentWidth,
		animation,
		setAnimation,
	} as const
}
