import { cn } from "@/utils/cn"
import { Search } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Button } from "../ui/button"
import type { InputProps } from "../ui/input/input"
import Input from "../ui/input/input"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip/tooltip"

type SearchInputProps = InputProps & { expandable?: boolean }

export const SearchInput = ({
	expandable = false,
	className,
	...props
}: SearchInputProps) => {
	const [isExpanded, setIsExpanded] = useState(!expandable)
	const inputRef = useRef<HTMLInputElement>(null)

	const handleExpand = (e: React.MouseEvent) => {
		e.preventDefault()

		if (expandable) {
			inputRef.current?.focus()
		}
		expandable && setIsExpanded(prev => !prev)
	}

	useEffect(() => {
		if (!inputRef.current || !expandable) return

		const input = inputRef.current

		const onBlur = () => {
			setIsExpanded(false)
		}

		input.addEventListener("blur", onBlur)

		return () => input.removeEventListener("blur", onBlur)
	}, [expandable])

	return (
		<div className="relative ">
			<Input
				ref={inputRef}
				{...props}
				className={cn("transition-all ease-in-out duration-300 ", className, {
					"opacity-0 h-8 w-8 pointer-events-none p-0": !isExpanded,
				})}
			/>

			<Tooltip>
				<TooltipTrigger>
					<Button
						size={"icon"}
						variant={"iconTransparent"}
						onClick={handleExpand}
						hover={(!isExpanded && "iconSecondaryHover") || undefined}
						className={cn(
							" h-8 w-8 absolute left-0 top-[50%] translate-y-[-50%] ",
							{ "pointer-events-none": isExpanded }
						)}
					>
						<Search className="w-4 h-4" />
					</Button>
				</TooltipTrigger>
				<TooltipContent sideOffset={25}>
					<span>Искать в медиатеке</span>
				</TooltipContent>
			</Tooltip>
		</div>
	)
}
