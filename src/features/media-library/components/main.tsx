import { SearchInput } from "@/components/search-input/search-input"
import Box from "@/components/ui/box/box"
import { Button } from "@/components/ui/button"

import { Scrollbar } from "@/components/ui/scrollbar"
import {
	SidebarItemHided,
	SidebarMinMaxWithToggleButton,
	SidebarToggleButton,
} from "@/components/ui/sidebar/sidebar"
import { ArrowRight, Library, Menu } from "lucide-react"
import Cards from "./cards"

function MediaLibrary() {
	return (
		<Box
			className="h-full flex flex-col select-none relative"
			aria-label="Медиатека"
		>
			<div className="px-4 py-2  flex items-center justify-between">
				<SidebarToggleButton>
					<Button
						size={"lg"}
						variant={"text"}
						iconLeft={<Library />}
						tabIndex={-1}
					>
						<SidebarItemHided>Моя медиатека</SidebarItemHided>
					</Button>
				</SidebarToggleButton>
				<SidebarItemHided>
					<SidebarMinMaxWithToggleButton>
						<Button
							size={"icon"}
							variant={"iconTransparent"}
							hover={"iconSecondaryHover"}
							tabIndex={-1}
						>
							<ArrowRight />
						</Button>
					</SidebarMinMaxWithToggleButton>
				</SidebarItemHided>
			</div>
			<Scrollbar>
				<div className=" pt-[1px] ">
					<div className="px-2">
						<SidebarItemHided>
							<div className="flex justify-between px-2 transition-all mb-2">
								<SearchInput
									inputSize={"sm"}
									placeholder="Поиск треков и выпусков"
									expandable
									className=" w-[11.75rem]"
									aria-label="Поиск треков и выпусков"
								/>
								<Button
									size="sm"
									variant="text"
									className="pr-3"
									iconRight={<Menu className="h-4 w-4" />}
									hover="pulse"
									aria-label="Недавно прослушано"
								>
									Недавно прослушано
								</Button>
							</div>
						</SidebarItemHided>
					</div>
					<Cards />
				</div>
			</Scrollbar>
		</Box>
	)
}

export default MediaLibrary
