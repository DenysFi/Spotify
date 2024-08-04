import { cn } from "@/utils/cn"
import { useCallback, useEffect } from "react"

import { useSidebar } from "./context/useSidebar.hook"
import { SidebarProvider } from "./context/sidebar-context"
import { useResizer } from "../resizer/context/useResizer"
import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip/tooltip"

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
			<nav role="Левый сайдбар" className={cn(className)}>
				{children}
			</nav>
		</SidebarProvider>
	)
}

export function SidebarItem({
	children,
	className,
}: PropsWithClassnameNdChildren) {
	return (
		<div className={cn(`transition-colors group relative  w-full`, className)}>
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

export function SidebarNavigation({
	children,
	className,
}: PropsWithClassnameNdChildren) {
	return <ul className={cn(className)}>{children}</ul>
}

export function SidebarNavigationItem({
	children,
}: PropsWithClassnameNdChildren) {
	return children
}

export function SidebarToggleButton({
	children,
	className,
}: PropsWithClassnameNdChildren) {
	const { expanded, setExpanded } = useSidebar()
	const { isResizing, setCurrentWidth, id, min } = useResizer()

	const toggleWidth = useCallback(() => {
		const prevWidth = id
			? JSON.parse(localStorage.getItem(id ?? "") || "{}")
			: min

		setExpanded(state => !state)

		expanded ? setCurrentWidth(MIN_WIDTH) : setCurrentWidth(prevWidth)
	}, [expanded, min, id, setCurrentWidth, setExpanded])

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
				onClick={toggleWidth}
				className={cn(
					"transition-transform rotate-0 rounded-full",
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
