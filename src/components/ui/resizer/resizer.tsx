import { cn } from "@/utils/cn"
import { type HtmlHTMLAttributes, type ReactNode } from "react"

import "./resizer.scss"
import { useResizable, type UseResizableProps } from "./useResizable"
import { ResizerProvider } from "./context/resizer-context"

type ResizerProps = HtmlHTMLAttributes<HTMLDivElement> &
	UseResizableProps & {
		children: ReactNode
		className?: string
	}

function Resizer({
	min,
	max,
	id = "resizerWidth",
	saveLastWidth = true,
	position,
	children,
	className,
	...props
}: ResizerProps) {
	const {
		contentRef,
		resizerRef,
		setCurrentWidth,
		isResizing,
		setAnimation,
		currentWidth,
		animation,
	} = useResizable({
		min,
		max,
		id,
		saveLastWidth,
		position,
	})
	return (
		<ResizerProvider
			initial={{
				min,
				max,
				id,
				saveLastWidth,
				position,
				setCurrentWidth,
				isResizing,
				currentWidth,
				animation,
				setAnimation,
			}}
		>
			<div
				ref={contentRef}
				className={cn(
					"relative inline-block ",
					{
						"transition-[width]": animation || !isResizing,
					},
					className
				)}
				{...props}
			>
				<div
					ref={resizerRef}
					className={cn(
						" absolute flex items-center justify-center  h-full top-0 resizer-outline focus-within:after:opacity-100 focus-within:after:bg-[var(--resizer-bg-active)] after:h-[calc(100%-16px)] after:transition-all after:opacity-0 after:hover:opacity-100 duration-700 after:bg-[var(--resizer-bg-hover)] z-1000 cursor-grab w-[var(--panel-gap)] after:content-[''] after:w-[1px] ",
						{
							"start-[calc(var(--panel-gap)*-1)]": position === "left",
							"end-[calc(var(--panel-gap)*-1)]": position === "right",
							"after:opacity-100 after:bg-[var(--resizer-bg-active)] cursor-grabbing":
								isResizing,
						}
					)}
				>
					<label className="w-[1px] h-[1px] margin-[-1px] overflow-hidden p-0 absolute border-0">
						Изменить размер главной панели навигации
						<input
							type="range"
							max={max}
							min={min}
							step={10}
							dir={position === "left" ? "rtl" : "ltr"}
							onChange={e => setCurrentWidth(parseInt(e.target.value))}
							value={currentWidth}
						/>
					</label>
				</div>
				{children}
			</div>
		</ResizerProvider>
	)
}

export { Resizer }
