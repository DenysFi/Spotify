import { type HtmlHTMLAttributes } from "react"
import { cn } from "@/utils/cn"
import { cva, type VariantProps } from "class-variance-authority"

const skeletonTitleVariants = cva("bg-secondaryGray rounded-sm  ", {
	variants: {
		size: {
			sm: "w-[70%] h-4",
			// md: "w-44 h-44",
			// lg: "w-[21rem] h-[21rem]",
		},
	},
	defaultVariants: { size: "sm" },
})

type SkeletonTitleProps = VariantProps<typeof skeletonTitleVariants> &
	HtmlHTMLAttributes<HTMLParagraphElement>

function SkeletonTitle({ className, size, ...props }: SkeletonTitleProps) {
	return (
		<p
			className={cn(skeletonTitleVariants({ size, className }))}
			{...props}
		></p>
	)
}

export default SkeletonTitle
