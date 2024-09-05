import { useCallback, useEffect, useRef, useState } from "react"

export function useInView() {
	const [inView, setInView] = useState(false)

	const ref = useCallback(node => {
		if (!node) return

		const observer = new IntersectionObserver(([entry]) => {
			setInView(entry.isIntersecting)
		})
		observer.observe(node)
	}, [])

	return { ref, inView }
}
