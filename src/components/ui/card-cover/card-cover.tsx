import { cn } from "@/utils/cn"
import { cva, type VariantProps } from "class-variance-authority"
import type { HtmlHTMLAttributes } from "react"

const cardImageVariants = cva(
	"rounded-sm relative overflow-hidden w-full h-full",
	{
		variants: {
			variant: {
				author: "rounded-full",
				playlist: "",
				album: "",
			},
			size: {
				sm: "max-w-12 max-h-12",
				md: "max-w-44 max-h-44",
				lg: "max-w-[21rem] max-h-[21rem]",
			},
		},
		defaultVariants: { size: "sm" },
	}
)

type CardImageProps = VariantProps<typeof cardImageVariants> &
	HtmlHTMLAttributes<HTMLDivElement> & {
		imgSrc: string
	}

function CardСover({
	className,
	variant,
	imgSrc,
	size,
	...props
}: CardImageProps) {
	return (
		<div
			className={cn(cardImageVariants({ variant, size, className }))}
			{...props}
		>
			<img
				className="w-full h-full  object-cover"
				aria-hidden="true"
				draggable="false"
				src={imgSrc}
				alt="Любимые треки"
			/>
		</div>
	)
}
// https://misc.scdn.co/liked-songs/liked-songs-64.png
export default CardСover
