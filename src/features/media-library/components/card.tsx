import CardСover from "@/components/ui/card-cover/card-cover"
import { useSidebar } from "@/components/ui/sidebar/context/useSidebar.hook"
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip/tooltip"
import { cn } from "@/utils/cn"
import { getTextByType } from "@/utils/get-text-by-type"
import { useCallback, type HtmlHTMLAttributes } from "react"
import type { CardType } from "../types"
import { useLocation, useNavigate } from "react-router-dom"

type CardProps = HtmlHTMLAttributes<HTMLLIElement> & {
	cardData: CardType
	size?: "md" | "lg" | "sm"
}
function Card({ cardData, size, ...props }: CardProps) {
	const { expanded } = useSidebar()

	const navigate = useNavigate()

	const handleClick = useCallback(() => {
		navigate(`./${cardData.type}/${cardData.id}`)
	}, [navigate, cardData])

	const location = useLocation()
	const isActive = new RegExp(
		`^(?=.*${cardData.type})(?=.*${cardData.id}).*$`
	).test(location.pathname)

	return (
		<li
			role="listitem"
			tabIndex={1}
			onClick={handleClick}
			className={cn(
				"w-full transition-colors py-2 flex gap-3 items-center cursor-pointer hover:bg-iconPrimaryHover rounded-md",
				{
					"p-2": expanded,
					"justify-center": !expanded,
					"bg-iconPrimaryHover": isActive,
				}
			)}
			{...props}
		>
			<Tooltip>
				<TooltipTrigger className="shrink-0">
					<CardСover
						variant={cardData.type}
						size={size}
						imgSrc={cardData.img}
						aria-label="cover"
						role="link"
					/>
				</TooltipTrigger>
				<TooltipContent
					sideOffset={17}
					side="right"
					className={cn({ invisible: expanded })}
				>
					<div>
						<h3
							className={cn("text-white font-extrabold text-base", {
								"text-green-color": isActive,
							})}
						>
							{cardData.title}
						</h3>
						<p className="text-textButton text-sm font-bold">
							{getTextByType(cardData)}
						</p>
					</div>
				</TooltipContent>
			</Tooltip>

			{expanded && (
				<div className="flex flex-col items-start">
					<div className={cn({ "text-green-color": isActive })}>
						<h5 className={"text-ellipsis-custom font-bold pb-1 "}>
							<span>{cardData.title}</span>
						</h5>
					</div>
					<p className=" text-ellipsis-custom text-sm text-textButton font-semibold">
						{getTextByType(cardData)}
					</p>
				</div>
			)}
		</li>
	)
}

export default Card
