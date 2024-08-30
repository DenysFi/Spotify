import { type ReactNode } from "react"
import Head from "../seo/head"
import Box from "../ui/box/box"

import MediaLibrary from "@/features/media-library/components/main"
import { Resizer } from "../ui/resizer"
import Sidebar from "../ui/sidebar/sidebar"

import { useToken } from "./api/useToken"
import Loader from "../ui/loader/loader"
import { Scrollbar } from "../ui/scrollbar"
import LayoutHeader from "@/features/layout-header/components/layout-header"

function AppLayout({ children }: { children: ReactNode }) {
	const tokenQuery = useToken()
	return (
		<Loader isLoading={tokenQuery.isLoading}>
			<Head title="Spotify Music Player" />
			<main className="text-white bg-black h-screen w-screen grid-cols-[auto_minmax(26rem,_1fr)_auto]  relative overflow-hidden grid gap-[var(--panel-gap)] p-2 grid-rows-[3rem,_1fr,_4.5rem] [grid-template-areas:'header_header_header''left-sidebar_main_right-sidebar''player_player_player']">
				<LayoutHeader />
				<Sidebar className="grid [grid-area:left-sidebar] ">
					<Resizer
						className="flex gap-2 flex-col "
						position="right"
						min={288}
						max={384}
						saveLastWidth
					>
						<MediaLibrary />
					</Resizer>
				</Sidebar>
				<Box
					className="min-w-96 relative [grid-area:main] max-[1150px]:col-span-2"
					aria-label="Основной контент"
				>
					<Scrollbar>
						<main className="w-full h-full">{children}</main>
					</Scrollbar>
				</Box>
				<Resizer
					className="max-[1150px]:hidden  [grid-area:right-sidebar]"
					position="left"
					min={288}
					max={320}
					id="current"
				>
					<Box className=" h-full " aria-label="Текущая музыка">
						Sidebar
					</Box>
				</Resizer>

				<div className="text-white h-20 player">Player</div>
			</main>
		</Loader>
	)
}

export default AppLayout
