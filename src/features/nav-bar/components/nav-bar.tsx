import Box from "@/components/ui/box/box"
import {
	SidebarItemHided,
	SidebarNavigation,
	SidebarNavigationItem,
} from "@/components/ui/sidebar/sidebar"
import { House, Search } from "lucide-react"
import NavLink from "./nav-link"

function NavBar() {
	return (
		<Box className="h-[112px] select-none" aria-label="Навигация">
			<SidebarNavigation className="px-3 py-2">
				<SidebarNavigationItem>
					<NavLink
						to="/app"
						end
						size={"lg"}
						aria-label="Домашняя страница"
						variant={"text"}
						icon={<House />}
						className={"w-full"}
					>
						<SidebarItemHided>Главная</SidebarItemHided>
					</NavLink>
				</SidebarNavigationItem>
				<SidebarNavigationItem>
					<NavLink
						to="./search"
						end
						aria-label="Поиск"
						size={"lg"}
						variant={"text"}
						icon={<Search />}
						className={"w-full"}
					>
						<SidebarItemHided>Поиск</SidebarItemHided>
					</NavLink>
				</SidebarNavigationItem>
			</SidebarNavigation>
			{/* <nav className="px-3 py-2">
				<ul>
					<li>
						<NavLink
							to="/app"
							end
							size={"lg"}
							aria-label="Домашняя страница"
							variant={"text"}
							icon={<House />}
							className={"w-full"}
						>
							Главная
						</NavLink>
					</li>
					<li>
						<NavLink
							to="./search"
							end
							aria-label="Поиск"
							size={"lg"}
							variant={"text"}
							icon={<Search />}
							className={"w-full"}
						>
							Поиск
						</NavLink>
					</li>
				</ul>
			</nav> */}
		</Box>
	)
}

export default NavBar
