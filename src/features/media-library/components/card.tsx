import CardСover from "@/components/ui/card-cover/card-cover"
import { useSidebar } from "@/components/ui/sidebar/context/useSidebar.hook"
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip/tooltip"
import { cn } from "@/utils/cn"
import { getTextByType, type TCardVariantsEnum } from "@/utils/get-text-by-type"
import type { HtmlHTMLAttributes } from "react"

type CardProps = HtmlHTMLAttributes<HTMLLIElement> & {
	type: TCardVariantsEnum
	size?: "md" | "lg" | "sm"
	imgSrc: string
	title: string
}
function Card({ type, size, title, imgSrc, ...props }: CardProps) {
	const { expanded } = useSidebar()
	return (
		<li
			role="listitem"
			tabIndex={1}
			className={cn(
				"w-full transition-colors py-2 flex gap-3 items-center cursor-pointer hover:bg-iconPrimaryHover rounded-md",
				{
					"p-2": expanded,
					"justify-center": !expanded,
				}
			)}
			{...props}
		>
			<Tooltip>
				<TooltipTrigger className="shrink-0">
					<CardСover variant={type} size={size} imgSrc={imgSrc} />
				</TooltipTrigger>
				<TooltipContent
					sideOffset={17}
					side="right"
					className={cn({ "opacity-0": expanded })}
				>
					<div>
						<h3 className="text-white font-extrabold text-base">{title}</h3>
						<p className="text-textButton text-sm font-bold">
							{getTextByType(type)}
						</p>
					</div>
				</TooltipContent>
			</Tooltip>

			{expanded && (
				<div className="flex flex-col items-start">
					<h5 className="text-ellipsis-custom font-bold pb-1">{title}</h5>
					<p className=" text-ellipsis-custom text-sm text-textButton font-semibold">
						{getTextByType(type)}
					</p>
				</div>
			)}
		</li>
	)
}

export default Card
