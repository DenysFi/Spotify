import { type HtmlHTMLAttributes } from "react"
import { cn } from "@/utils/cn"
import { cva, type VariantProps } from "class-variance-authority"

const skeletonTextVariants = cva("bg-secondaryGray rounded-sm  ", {
	variants: {
		size: {
			sm: "w-[55%] h-3",
			// md: "w-44 h-44",
			// lg: "w-[21rem] h-[21rem]",
		},
	},
	defaultVariants: { size: "sm" },
})

type SkeletonTextProps = VariantProps<typeof skeletonTextVariants> &
	HtmlHTMLAttributes<HTMLParagraphElement>

function SkeletonText({ className, size, ...props }: SkeletonTextProps) {
	return (
		<p className={cn(skeletonTextVariants({ size, className }))} {...props}></p>
	)
}

export default SkeletonText
