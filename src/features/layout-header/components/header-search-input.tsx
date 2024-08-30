import { Button } from "@/components/ui/button"
import Input from "@/components/ui/input/input"
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip/tooltip"
import NavLink from "@/features/nav-bar/components/nav-link"
import { useDebounce } from "@/hooks/use-debounce"
import { FolderOpenDot, Search, X } from "lucide-react"
import { useEffect, useRef, useState, type ChangeEvent } from "react"
import { useLocation, useNavigate } from "react-router-dom"

function HeaderSearchInput() {
	const navigate = useNavigate()
	const location = useLocation()
	const [inputValue, setInputValue] = useState("")
	const debouncedValue = useDebounce({ value: inputValue, delay: 200 })

	const ref = useRef<HTMLInputElement>(null)

	useEffect(() => {
		const tid = setTimeout(() => {
			if (!location.pathname.match(/\/search/)) {
				setInputValue("")
				return
			}

			if (debouncedValue) {
				navigate(`./search/${debouncedValue}`)
			}
		}, 0)

		return () => clearTimeout(tid)
	}, [navigate, location, debouncedValue])

	function onChange(e: ChangeEvent<HTMLInputElement>) {
		setInputValue(e.target.value)
	}

	function onClearInput() {
		setInputValue("")
		navigate("./search")
	}

	return (
		<div className="relative flex w-full items-center ">
			<form
				className="relative w-full flex bg-[var(--background-elevated-base)] pl-12 pr-16 py-3 rounded-full group box-border focus-within:bg-[var(--background-elevated-highlight)] hover:bg-[var(--background-elevated-highlight)] transition-colors focus:border-white"
				onClick={() => {
					if (!ref.current || location.pathname.match(/\/search/)) return

					ref.current.focus()
					navigate("./search")
				}}
			>
				<Tooltip>
					<TooltipTrigger asChild>
						<div className="absolute text-textButton cursor-pointer left-3 top-[50%] translate-y-[-50%]  group-focus-within:text-white group-hover:text-white ">
							<Search />
						</div>
					</TooltipTrigger>
					<TooltipContent sideOffset={19}>
						<span>Поиск</span>
					</TooltipContent>
				</Tooltip>

				<Input
					ref={ref}
					onChange={onChange}
					value={inputValue}
					className="p-0 bg-transparent h-6 w-full cursor-pointer focus:cursor-auto text-white outline-none"
					placeholder="Что хочешь включить?"
				/>
				{!inputValue ? (
					<Tooltip>
						<TooltipTrigger asChild>
							<div className="absolute cursor-pointer text-textButton right-3 pl-3 h-6 border-l-[1px] pr-1 border-textButton top-[50%] translate-y-[-50%]">
								<NavLink
									to={"./search"}
									variant={"iconTransparent"}
									className=" p-0  h-full"
									type="button"
									hover={"pulse"}
								>
									<FolderOpenDot />
								</NavLink>
							</div>
						</TooltipTrigger>
						<TooltipContent sideOffset={19}>
							<span>Обзор</span>
						</TooltipContent>
					</Tooltip>
				) : (
					<Tooltip>
						<TooltipTrigger asChild>
							<div className="absolute flex items-center justify-center cursor-pointer text-textButton right-3 pr-1  top-[50%] translate-y-[-50%]">
								<Button
									onClick={onClearInput}
									variant={"iconTransparent"}
									className="p-0"
									type="button"
								>
									<X />
									<span className="sr-only">Clear input</span>
								</Button>
							</div>
						</TooltipTrigger>
						<TooltipContent sideOffset={17}>
							<span>Очистить строку поиска</span>
						</TooltipContent>
					</Tooltip>
				)}
			</form>
		</div>
	)
}

export default HeaderSearchInput
