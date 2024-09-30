import { cn } from "@/utils/cn"
import { cva, type VariantProps } from "class-variance-authority"
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

	useEffect(() => {
		if (!ref.current) return

		const observer = new IntersectionObserver(
			([e]) => {
				setIsPinned(!e.isIntersecting)
			},
			{ threshold: [1] }
		)

		observer.observe(ref.current)

		return () => {
			observer.disconnect()
		}
	}, [])

	return (
		<div
			role="tableheader"
			ref={ref}
			className={cn(
				"sticky flex top-[-1px] z-30 w-full h-9   items-center border-b-[1px] border-white/10 mb-4 text-sm text-textButton pointer-events-none ",
				{
					"bg-[#1f1f1f] w-[calc(100%+var(--content-spacing))*2] transition-colors duration-400 mx-[calc(var(--content-spacing)*-1)] px-[var(--content-spacing)]":
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

export const tableRowVariants = cva(
	"grid gap-4  group w-full px-4 hover:bg-[hsla(0, 0%, 100%, .1)] items-center hover:bg-white/10 rounded-[4px] transition-colors",
	{
		variants: {
			grid: {
				full: `@[766px]:grid-cols-[1rem_minmax(7.5rem,_6fr)_minmax(7.5rem,_4fr)_minmax(7.5rem,_3fr)_minmax(7.5rem,_1fr)] 
				@[530px]:grid-cols-[1rem_minmax(7.5rem,_6fr)_minmax(7.5rem,_4fr)_minmax(7.5rem,_1fr)] grid-cols-[1rem_minmax(7.5rem,_6fr)_minmax(7.5rem,_1fr)]
				[&>*:nth-child(3)]:@[530px]:flex [&>*:nth-child(3)]:hidden
				[&>*:nth-child(4)]:@[766px]:flex [&>*:nth-child(4)]:hidden
				[&>*:nth-child(5)]:flex [&>*:nth-child(5)]:justify-end
				`,
				compact: `grid-cols-[1rem_minmax(7.5rem,_4fr)_minmax(7.5rem,_1fr)] 
				[&>*:nth-child(3)]:flex [&>*:nth-child(3)]:justify-end
				`,
			},
		},
		defaultVariants: {
			grid: "full",
		},
	}
)

type TableRowProps = VariantProps<typeof tableRowVariants> &
	React.HTMLAttributes<HTMLDivElement>

const TableRow = React.forwardRef<HTMLDivElement, TableRowProps>(
	({ className, grid, ...props }, ref) => (
		<div
			role="tablerow"
			ref={ref}
			className={cn(tableRowVariants({ grid, className }))}
			{...props}
		/>
	)
)
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
