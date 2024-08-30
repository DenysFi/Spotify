import { Button } from "@/components/ui/button"
import { useAuth } from "@/features/auth/context/useAuth"
import { Download, Bell, House } from "lucide-react"

import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip/tooltip"
import Logo from "@/components/ui/logo/logo"
import NavLink from "@/features/nav-bar/components/nav-link"
import HeaderSearchInput from "./header-search-input"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/auth"
import {
	Dropdown,
	DropdownContent,
	DropdownItem,
	DropdownTrigger,
} from "@/components/ui/dropdown/dropdown"

function LayoutHeader() {
	const user = useAuth()

	return (
		<header className="[grid-area:header] flex items-center h-full justify-between relative">
			<Logo className="ml-3" />
			<div className=" min-[1600px]:absolute right-0 left-0 h-full  flex items-center min-[1600px]:justify-center gap-2">
				<div className="w-[50%] flex gap-2 max-w-[34rem] min-w-[21rem]">
					<Tooltip>
						<TooltipTrigger asChild>
							<NavLink
								to="/app"
								end
								size="icon"
								hover="pulse"
								className="bg-[var(--background-elevated-base)] p-6"
								aria-label="Домашняя страница"
								variant="icon"
								icon={<House />}
							/>
						</TooltipTrigger>
						<TooltipContent side="bottom" sideOffset={7}>
							<span>Домашняя страница</span>
						</TooltipContent>
					</Tooltip>
					<HeaderSearchInput />
				</div>
			</div>
			<div className="flex gap-2 relative z-10 items-center">
				<Button
					size={"sm"}
					variant={"pillFilled"}
					hover={"pulse"}
					className="max-[1200px]:hidden"
				>
					Узнать больше о Premium
				</Button>
				<Button
					size="sm"
					variant="default"
					hover="pulse"
					iconLeft={<Download className="h-4 w-4" strokeWidth={3} />}
					className="max-[1200px]:hidden"
				>
					Установить приложение
				</Button>
				<Button size="icon" variant="icon" hover="pulse">
					<Bell className="h-4 w-4" />
				</Button>
				<Dropdown modal={false}>
					<Tooltip>
						<TooltipTrigger asChild>
							<DropdownTrigger asChild>
								<Button
									variant="icon"
									hover="pulse"
									className="w-12 h-12 p-0 bg-[var(--background-elevated-base)] flex items-center justify-center"
								>
									<span className="bg-green-400  w-8 h-8 text-black rounded-full flex items-center justify-center">
										{user.currentUser?.displayName?.charAt(0)}
									</span>
								</Button>
							</DropdownTrigger>
						</TooltipTrigger>
						<TooltipContent sideOffset={10}>
							<span>{user.currentUser?.displayName}</span>
						</TooltipContent>
					</Tooltip>
					<DropdownContent className="mr-2" sideOffset={5} alignOffset={50}>
						<DropdownItem onClick={() => signOut(auth)}>Выйти</DropdownItem>
					</DropdownContent>
				</Dropdown>
			</div>
		</header>
	)
}

export default LayoutHeader
