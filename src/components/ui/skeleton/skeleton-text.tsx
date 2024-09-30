import { type HtmlHTMLAttributes } from "react"
import { cn } from "@/utils/cn"
import { cva, type VariantProps } from "class-variance-authority"

const skeletonTextVariants = cva("animate-pulse bg-secondaryGray   ", {
	variants: {
		size: {
			sm: " h-3",
			md: "h-4",
			// md: "w-44 h-44",
			// lg: "w-[21rem] h-[21rem]",
		},
		type: {
			"rounded-sm": "rounded-sm",
			"rounded-md": "rounded-[0.25rem]",
		},
	},
	defaultVariants: { type: "rounded-sm", size: "sm" },
})

type SkeletonTextProps = VariantProps<typeof skeletonTextVariants> &
	HtmlHTMLAttributes<HTMLParagraphElement>

function SkeletonText({ className, size, ...props }: SkeletonTextProps) {
	return (
		<p className={cn(skeletonTextVariants({ size, className }))} {...props}></p>
	)
}

export default SkeletonText
