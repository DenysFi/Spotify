import { cn } from "@/utils/cn"
import type { HTMLAttributes, ReactNode } from "react"

type BoxProps = HTMLAttributes<HTMLElement> & {
	className?: string
	children?: ReactNode
}

function Box({ children, className, ...props }: BoxProps) {
	return (
		<section
			className={cn("rounded-md bg-primaryBg overflow-hidden", className)}
			{...props}
		>
			{children}
		</section>
	)
}

export default Box
