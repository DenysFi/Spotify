import { cn } from "@/utils/cn"
import { useCallback, useEffect } from "react"

import { useSidebar } from "./context/useSidebar.hook"
import { SidebarProvider } from "./context/sidebar-context"
import { useResizer } from "../resizer/context/useResizer"
import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip/tooltip"
import type { TCardVariantsEnum } from "@/utils/get-text-by-type"

const MIN_WIDTH = 72

type PropsWithClassnameNdChildren = {
	children: React.ReactNode
	className?: string
}

export default function Sidebar({
	children,
	className,
}: PropsWithClassnameNdChildren) {
	return (
		<SidebarProvider>
			<aside role="Левый сайдбар" className={cn(className)}>
				{children}
			</aside>
		</SidebarProvider>
	)
}

export function SidebarItem({
	children,
	className,
}: PropsWithClassnameNdChildren) {
	return (
		<div
			// onClick={handleClick}
			className={cn(`transition-colors group relative  w-full`, className)}
		>
			<SidebarContent>{children}</SidebarContent>
		</div>
	)
}

export function SidebarContent({
	children,
	className,
}: PropsWithClassnameNdChildren) {
	return (
		<div className={cn("overflow-hidden transition-all", className)}>
			{children}
		</div>
	)
}

export function SidebarToggleButton({
	children,
	className,
}: PropsWithClassnameNdChildren) {
	const { expanded, setExpanded } = useSidebar()
	const { isResizing, setCurrentWidth, setAnimation, id, min } = useResizer()

	const toggleWidth = useCallback(() => {
		const prevWidth = id
			? JSON.parse(localStorage.getItem(id ?? "") || "{}")
			: min

		setExpanded(state => !state)

		localStorage.setItem("sidebar", String(!expanded))

		expanded ? setCurrentWidth(MIN_WIDTH) : setCurrentWidth(prevWidth)
	}, [expanded, min, id, setCurrentWidth, setExpanded])

	useEffect(() => {
		const expPrev = JSON.parse(localStorage.getItem("sidebar") || "true")
		let tid: number
		if (expPrev === false) {
			setCurrentWidth(MIN_WIDTH)

			tid = setTimeout(() => {}, 100)
		}

		return () => clearTimeout(tid)
	}, [setCurrentWidth, setAnimation])

	useEffect(() => {
		function onResize() {
			if (expanded) return

			const prevWidth = id
				? JSON.parse(localStorage.getItem(id ?? "") || "{}")
				: min

			setExpanded(state => !state)
			setCurrentWidth(prevWidth)
		}

		isResizing && onResize()
	}, [isResizing, expanded, id, min, setCurrentWidth, setExpanded])

	return (
		<Tooltip>
			<TooltipTrigger
				asChild
				onClick={toggleWidth}
				className={cn("rounded-full", className)}
				aria-label={
					expanded ? "Закрыть мою медиатеку" : "Открыть мою медиатеку"
				}
			>
				{children}
			</TooltipTrigger>
			<TooltipContent sideOffset={7} side={expanded ? "top" : "right"}>
				{expanded ? "Закрыть" : "Открыть"} медиатеку
			</TooltipContent>
		</Tooltip>
	)
}

export function SidebarMinMaxWithToggleButton({
	children,
	className,
}: PropsWithClassnameNdChildren) {
	const { min, max, currentWidth, setCurrentWidth } = useResizer()

	const isMin = currentWidth === min

	function toggleWidth() {
		isMin ? setCurrentWidth(max) : setCurrentWidth(min)
	}

	return (
		<Tooltip>
			<TooltipTrigger
				asChild
				onClick={toggleWidth}
				className={cn(
					"transition-transform rotate-0 ",
					{ " rotate-180": !isMin },
					className
				)}
				aria-label={isMin ? "Расширить медиатеку" : "Свернуть медиатеку"}
			>
				{children}
			</TooltipTrigger>
			<TooltipContent sideOffset={7}>
				{isMin ? "Развернуть " : "Свернуть"}
			</TooltipContent>
		</Tooltip>
	)
}

type SidebarItemHidedProps = {
	children: React.ReactNode
}

export function SidebarItemHided({ children }: SidebarItemHidedProps) {
	const { expanded } = useSidebar()
	return expanded ? children : null
}
