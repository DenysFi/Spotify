import { SidebarItem } from "@/components/ui/sidebar/sidebar"
import Card from "./card"
import { useSidebar } from "@/components/ui/sidebar/context/useSidebar.hook"
import { cn } from "@/utils/cn"

function Cards() {
	const { expanded } = useSidebar()
	return (
		<ul
			role="list"
			tabIndex={0}
			className={cn("m-2", {
				"m-1": !expanded,
			})}
		>
			<SidebarItem>
				<Card
					title="Любимые треки"
					imgSrc="https://misc.scdn.co/liked-songs/liked-songs-300.png"
					type="playlist"
				/>
			</SidebarItem>

			<SidebarItem>
				<Card
					title="Chillout - Summer 2024"
					imgSrc="https://i2o.scdn.co/image/ab67706c0000cfa36dc96ff9d81f0163f91b4730"
					type="playlist"
				/>
			</SidebarItem>

			<SidebarItem>
				<Card
					title="FEDUC"
					imgSrc="https://i.scdn.co/image/ab6761610000101f8a43511b9c423d5b8b36af6e"
					type="author"
				/>
			</SidebarItem>

			<SidebarItem>
				<Card
					title="Любимые треки"
					imgSrc="https://misc.scdn.co/liked-songs/liked-songs-300.png"
					type="playlist"
				/>
			</SidebarItem>
			<SidebarItem>
				<Card
					title="Chillout - Summer 2024"
					imgSrc="https://i2o.scdn.co/image/ab67706c0000cfa36dc96ff9d81f0163f91b4730"
					type="playlist"
				/>
			</SidebarItem>

			<SidebarItem>
				<Card
					title="FEDUC"
					imgSrc="https://i.scdn.co/image/ab6761610000101f8a43511b9c423d5b8b36af6e"
					type="author"
				/>
			</SidebarItem>
			<SidebarItem>
				<Card
					title="Любимые треки"
					imgSrc="https://misc.scdn.co/liked-songs/liked-songs-300.png"
					type="playlist"
				/>
			</SidebarItem>
			<SidebarItem>
				<Card
					title="Chillout - Summer 2024"
					imgSrc="https://i2o.scdn.co/image/ab67706c0000cfa36dc96ff9d81f0163f91b4730"
					type="playlist"
				/>
			</SidebarItem>

			<SidebarItem>
				<Card
					title="FEDUC"
					imgSrc="https://i.scdn.co/image/ab6761610000101f8a43511b9c423d5b8b36af6e"
					type="author"
				/>
			</SidebarItem>
			<SidebarItem>
				<Card
					title="Любимые треки"
					imgSrc="https://misc.scdn.co/liked-songs/liked-songs-300.png"
					type="playlist"
				/>
			</SidebarItem>
			<SidebarItem>
				<Card
					title="Chillout - Summer 2024"
					imgSrc="https://i2o.scdn.co/image/ab67706c0000cfa36dc96ff9d81f0163f91b4730"
					type="playlist"
				/>
			</SidebarItem>

			<SidebarItem>
				<Card
					title="FEDUC"
					imgSrc="https://i.scdn.co/image/ab6761610000101f8a43511b9c423d5b8b36af6e"
					type="author"
				/>
			</SidebarItem>
		</ul>
	)
}

export default Cards
