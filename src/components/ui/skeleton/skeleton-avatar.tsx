import { type HtmlHTMLAttributes } from "react"
import { cn } from "@/utils/cn"
import { cva, type VariantProps } from "class-variance-authority"

const skeletonAvatarVariants = cva("bg-secondaryGray rounded-sm  ", {
	variants: {
		variant: {
			artist: "rounded-full",
			playlist: "",
			album: "",
		},
		size: {
			sm: "w-12 h-12",
			md: "w-44 h-44",
			lg: "w-[21rem] h-[21rem]",
		},
	},
	defaultVariants: { size: "sm" },
})

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
