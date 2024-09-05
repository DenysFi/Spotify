import { type HtmlHTMLAttributes } from "react"
import { cn } from "@/utils/cn"
import { cva, type VariantProps } from "class-variance-authority"

const skeletonAvatarVariants = cva(
	"animate-pulse bg-secondaryGray rounded-sm  ",
	{
		variants: {
			variant: {
				avatar: "rounded-full",
				track: "rounded",
			},

			size: {
				sm: "w-12 h-12",
				md: "w-[2.5rem] h-[2.5rem]",
				lg: "w-56 h-56",
				xl: "w-[21rem] h-[21rem]",
			},
		},
		defaultVariants: { size: "sm" },
	}
)

type SkeletonAvatarProps = VariantProps<typeof skeletonAvatarVariants> &
	HtmlHTMLAttributes<HTMLDivElement>

function SkeletonAvatar({
	className,
	variant,
	size,
	...props
}: SkeletonAvatarProps) {
	return (
		<div
			className={cn(skeletonAvatarVariants({ variant, size, className }))}
			{...props}
		></div>
	)
}

export default SkeletonAvatar
