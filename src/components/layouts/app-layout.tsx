import { type ReactNode } from "react"
import Head from "../seo/head"
import Box from "../ui/box/box"

import MediaLibrary from "@/features/media-library/components/main"
import NavBar from "@/features/nav-bar/components/nav-bar"
import { Resizer } from "../ui/resizer"
import Sidebar from "../ui/sidebar/sidebar"

function AppLayout({ children }: { children: ReactNode }) {
	return (
		<main className="bg-black h-screen w-screen  relative overflow-hidden grid grid-rows-[1fr,_4.5rem] ">
			<Head title="Spotify Music Player" />
			<Sidebar className="  text-white  grid grid-cols-[auto_minmax(26rem,_1fr)_auto] gap-[var(--panel-gap)] p-2  ">
				<Resizer
					className="flex gap-2 flex-col "
					position="right"
					min={288}
					max={384}
					saveLastWidth
				>
					<NavBar />
					<MediaLibrary />
				</Resizer>
				<Box className=" min-w-96" aria-label="Основной контент">
					main content
					{children}
				</Box>
				<Resizer position="left" min={288} max={320} id="current">
					<Box className=" h-full " aria-label="Текущая музыка">
						Sidebar
					</Box>
				</Resizer>
			</Sidebar>
			<div className="text-white h-20">Player</div>
		</main>
	)
}

export default AppLayout
