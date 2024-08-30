import { cn } from "@/utils/cn"
import React, { useEffect, useRef } from "react"

const TableElement = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("w-full @container", className)}
		{...props}
	></div>
))
TableElement.displayName = "Table"

const TableHeader = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => {
	const ref = useRef<HTMLDivElement>(null)
	const [isPinned, setIsPinned] = React.useState(false)
	console.log(isPinned)
	useEffect(() => {
		if (!ref.current) return

		const observer = new IntersectionObserver(
			([e]) => {
				setIsPinned(!e.isIntersecting)
			},
			{ threshold: [1] }
		)

		observer.observe(ref.current)
	}, [])

	return (
		<div
			role="tableheader"
			ref={ref}
			className={cn(
				"sticky top-[-1px] z-10 w-full h-9 inline-block items-center border-b-[1px] border-white/10 mb-4 text-sm text-textButton pointer-events-none",
				{
					"bg-[#1f1f1f] w-[calc(100%+var(--content-spacing)*2)] transition-colors duration-400 mx-[calc(var(--content-spacing)*-1)] px-[var(--content-spacing)]":
						isPinned,
				},
				className
			)}
			{...props}
		/>
	)
}

TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div role="TableBody" ref={ref} className={cn("", className)} {...props} />
))
TableBody.displayName = "TableBody"

const TableRow = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		role="tablerow"
		ref={ref}
		className={cn(
			"grid gap-4 group w-full px-4 hover:bg-[hsla(0, 0%, 100%, .1)] hover:bg-white/10 rounded-[4px] transition-colors",
			className
		)}
		{...props}
	/>
))
TableRow.displayName = "TableRow"

const TableCell = React.forwardRef<
	HTMLDivElement,
	React.TdHTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		role="tablecell"
		ref={ref}
		className={cn("flex w-full", className)}
		{...props}
	/>
))
TableCell.displayName = "TableCell"

export { TableElement, TableHeader, TableBody, TableRow, TableCell }
