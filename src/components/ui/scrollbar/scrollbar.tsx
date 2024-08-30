import React, { useCallback, useEffect, useRef, useState } from "react"
import "./scrollbar.scss"
import { cn } from "@/utils/cn"
import useVisible from "./use-visible.hook"

const DELAY = 1000

const Scrollbar = ({
	children,
	className = "",
}: {
	children: React.ReactNode
	className?: string
}) => {
	const contentRef = useRef<HTMLDivElement>(null)
	const scrollTrackRef = useRef<HTMLDivElement>(null)
	const scrollThumbRef = useRef<HTMLDivElement>(null)
	const scrollContainerRef = useRef<HTMLDivElement>(null)

	const timeoutId = useRef<number | null>(null)

	const [isDragging, setIsDragging] = useState(false)
	const [isContentEquialTrack, setIsContentEquialTrack] = useState(false)

	const [scrollStartPosition, setScrollStartPosition] = useState(0)
	const [initialContentScrollTop, setInitialContentScrollTop] = useState(0)

	const [thumbHeight, setThumbHeight] = useState(20)

	const { onVisible, offVisible, isVisible } = useVisible({
		element: scrollContainerRef.current,
		flag: isDragging,
		delay: DELAY,
	})

	function handleResize() {
		if (scrollTrackRef.current && contentRef.current) {
			const { clientHeight: trackSize } = scrollTrackRef.current
			const { clientHeight: contentVisible, scrollHeight: contentTotalHeight } =
				contentRef.current

			const newThumbHeight = Math.max(
				(contentVisible / contentTotalHeight) * trackSize,
				20
			)

			setThumbHeight(newThumbHeight)

			trackSize === newThumbHeight
				? setIsContentEquialTrack(true)
				: setIsContentEquialTrack(false)
		}
	}

	const handleThumbPosition = useCallback(() => {
		if (
			!contentRef.current ||
			!scrollTrackRef.current ||
			!scrollThumbRef.current
		) {
			return
		}

		const { scrollTop: contentTop, scrollHeight: contentHeight } =
			contentRef.current
		const { clientHeight: trackHeight } = scrollTrackRef.current

		let newTop = (contentTop / contentHeight) * trackHeight
		newTop = Math.min(newTop, trackHeight - thumbHeight)

		const thumb = scrollThumbRef.current
		requestAnimationFrame(() => {
			thumb.style.top = `${newTop}px`
		})
	}, [thumbHeight])

	useEffect(() => {
		if (!contentRef.current || !scrollContainerRef.current) return

		const content = contentRef.current

		const resizeObserver = new ResizeObserver(handleResize)
		resizeObserver.observe(content)

		const mutationObserver = new MutationObserver(handleResize)
		mutationObserver.observe(content, {
			childList: true,
			subtree: true,
		})

		content.addEventListener("scroll", handleThumbPosition)

		return () => {
			resizeObserver?.unobserve(content)
			mutationObserver.disconnect()
			content.removeEventListener("scroll", handleThumbPosition)
		}
	}, [handleThumbPosition])

	function handleThumbMousedown(e: React.MouseEvent<HTMLDivElement>) {
		e.preventDefault()
		e.stopPropagation()

		setScrollStartPosition(e.clientY)

		if (contentRef.current)
			setInitialContentScrollTop(contentRef.current.scrollTop)

		setIsDragging(true)
	}
	const handleThumbMouseup = useCallback(
		(e: MouseEvent) => {
			e.preventDefault()
			e.stopPropagation()

			if (isDragging) {
				setIsDragging(false)
			}

			document.body.style.removeProperty("pointer-events")
		},
		[isDragging]
	)

	const handleThumbMousemove = useCallback(
		(e: MouseEvent) => {
			e.preventDefault()
			e.stopPropagation()

			if (!contentRef.current || !isDragging) return

			document.body.style.setProperty("pointer-events", "none")

			const {
				scrollHeight: contentScrollHeight,
				clientHeight: contentClientHeight,
			} = contentRef.current

			const deltaY =
				(e.clientY - scrollStartPosition) * (contentClientHeight / thumbHeight)

			const newScrollTop = Math.min(
				initialContentScrollTop + deltaY,
				contentScrollHeight - contentClientHeight
			)

			contentRef.current.scrollTop = newScrollTop
		},
		[initialContentScrollTop, isDragging, scrollStartPosition, thumbHeight]
	)

	const handleKeydown = useCallback(
		(e: KeyboardEvent) => {
			const scrollKeys = ["ArrowDown", "ArrowUp", "PageDown", "PageUp"]

			if (scrollKeys.includes(e.key)) {
				onVisible()

				if (timeoutId.current) clearTimeout(timeoutId.current)

				timeoutId.current = setTimeout(() => {
					offVisible()
				}, DELAY)
			}
		},
		[onVisible, offVisible]
	)

	useEffect(() => {
		if (!contentRef.current) return
		const content = contentRef.current

		content.addEventListener("keydown", handleKeydown)

		return () => {
			content.removeEventListener("keydown", handleKeydown)
		}
	}, [handleKeydown])

	useEffect(() => {
		document.addEventListener("mousemove", handleThumbMousemove)
		document.addEventListener("mouseup", handleThumbMouseup)
		return () => {
			document.removeEventListener("mousemove", handleThumbMousemove)
			document.removeEventListener("mouseup", handleThumbMouseup)
		}
	}, [handleThumbMousemove, handleThumbMouseup])

	function handleTrackClick(e: React.MouseEvent<HTMLDivElement>) {
		e.preventDefault()
		e.stopPropagation()
		const { current: track } = scrollTrackRef
		const { current: content } = contentRef

		if (track && content) {
			setIsDragging(true)

			const { clientY } = e
			const target = e.target as HTMLDivElement
			const rect = target.getBoundingClientRect()
			const trackTop = rect.top
			const thumbOffset = -(thumbHeight / 2)
			const clickRatio = (clientY - trackTop + thumbOffset) / track.clientHeight
			const scrollAmount = Math.floor(clickRatio * content.scrollHeight)

			content.scrollTo({
				top: scrollAmount,
				behavior: "smooth",
			})

			setIsDragging(false)
		}
	}

	return (
		<div
			className={cn("scrollbar-container", className)}
			ref={scrollContainerRef}
		>
			<div
				className="content "
				id="custom-scrollbars-content "
				ref={contentRef}
			>
				{children}
			</div>
			<div className="scrollbar">
				<div
					className={cn("track-and-thumb", {
						hided: isContentEquialTrack || !isVisible,
					})}
					role="scrollbar"
					aria-controls="custom-scrollbars-content"
				>
					<div
						className="track"
						ref={scrollTrackRef}
						onClick={handleTrackClick}
					></div>
					<div
						className={cn("thumb cursor-grab", {
							dragging: isDragging,
							"cursor-grabbing": isDragging,
						})}
						ref={scrollThumbRef}
						onMouseDown={handleThumbMousedown}
						style={{
							height: `${thumbHeight}px`,
						}}
					></div>
				</div>
			</div>
		</div>
	)
}

export { Scrollbar }
