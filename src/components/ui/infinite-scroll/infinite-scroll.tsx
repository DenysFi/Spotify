import { useInView } from "@/hooks/use-in-view"
import React, { useEffect } from "react"

interface InfiniteScrollProps {
	callback: () => void
	show: boolean
	children: React.ReactNode
}

function InfiniteScroll({ callback, show, children }: InfiniteScrollProps) {
	const { inView, ref } = useInView()

	useEffect(() => {
		if (!inView) return

		callback()
	}, [callback, inView])

	return (
		<>
			{children}
			{show && (
				<div
					ref={ref}
					className="-translate-y-4 w-full h-[1px] opacity-0"
				></div>
			)}
		</>
	)
}

export default InfiniteScroll
