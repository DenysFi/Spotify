import { cn } from "@/utils/cn"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import {
	forwardRef,
	type ComponentPropsWithoutRef,
	type ElementRef,
	type ReactNode,
} from "react"

export type TooltipProps = ComponentPropsWithoutRef<
	typeof TooltipPrimitive.Provider
> & {
	children: ReactNode
}

export const Tooltip = ({
	children,
	delayDuration = 0,
	skipDelayDuration = 0,
	...props
}: TooltipProps) => {
	return (
		<TooltipPrimitive.Provider
			delayDuration={delayDuration}
			skipDelayDuration={skipDelayDuration}
			{...props}
		>
			<TooltipPrimitive.Root>{children}</TooltipPrimitive.Root>
		</TooltipPrimitive.Provider>
	)
}

Tooltip.displayName = TooltipPrimitive.Root.displayName

export const TooltipTrigger = TooltipPrimitive.Trigger

export const TooltipContent = forwardRef<
	ElementRef<typeof TooltipPrimitive.Content>,
	ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ children, className, ...props }, ref) => {
	return (
		<TooltipPrimitive.Portal>
			<TooltipPrimitive.Content
				className={cn(
					"relative z-50 data-[state=delayed-open]:animate-tooltipFade py-1 px-2 text-white bg-iconPrimaryHover rounded-md text-sm font-semibold transition-all origin-[var(--radix-tooltip-content-transform-origin)]",
					className
				)}
				ref={ref}
				{...props}
			>
				{children}
			</TooltipPrimitive.Content>
		</TooltipPrimitive.Portal>
	)
})

TooltipContent.displayName = TooltipPrimitive.Content.displayName
