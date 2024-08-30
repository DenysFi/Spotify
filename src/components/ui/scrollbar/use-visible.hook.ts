import { useCallback, useEffect, useRef, useState } from "react"

type UseVisibleProps<T> = {
	element: T | null
	delay?: number
	flag?: boolean
}
type UseVisibleReturn = {
	onVisible: () => void
	offVisible: () => void
	isVisible: boolean
}

export default function useVisible<T extends HTMLElement>({
	element,
	flag = false,
	delay = 1000,
}: UseVisibleProps<T>): UseVisibleReturn {
	const [isVisible, setIsVisible] = useState(false)
	const timerId = useRef<number>()

	const offVisible = useCallback(() => {
		if (flag) return

		timerId.current = setTimeout(() => {
			setIsVisible(false)
		}, delay)
	}, [flag, delay])

	const onVisible = useCallback(() => {
		setIsVisible(true)
	}, [])

	useEffect(() => {
		if (!element) return

		element.addEventListener("mouseleave", offVisible)
		element.addEventListener("mousemove", onVisible)
		element.addEventListener("mouseenter", onVisible)

		return () => {
			clearTimeout(timerId.current)
			element.removeEventListener("mouseleave", offVisible)
			element.removeEventListener("mouseenter", onVisible)
		}
	}, [onVisible, offVisible, element])

	return { onVisible, offVisible, isVisible }
}
