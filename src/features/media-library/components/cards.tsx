import { useSidebar } from "@/components/ui/sidebar/context/useSidebar.hook"
import { SidebarItem } from "@/components/ui/sidebar/sidebar"
import { cn } from "@/utils/cn"
import { getRecentlyListened } from "@/utils/recently-listened"
import { useMemo } from "react"
import { useArtists } from "../api/get-recently-listened"
import { useAlbums } from "@/features/album/api/useAlbums"
import {
	isAlbum,
	isPlaylist,
	type AlbumArtist,
	type CardType,
	type PlaylistOwner,
} from "../types"
import Card from "./card"
import CardSkeletons from "./card-skeletons"

import { usePlaylists } from "@/features/playlists/api/get-playlists"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function noramlizeData(data: any[]): CardType[] {
	return data?.map(item => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const base: any = {
			id: item.id,
			title: item.name,
			img: item.images[0].url,
			type: item.type,
		}

		if (isAlbum(item)) {
			base["artists"] = (item.artists as unknown[] as AlbumArtist[]).map(
				a => a.name
			)
		}

		if (isPlaylist(item)) {
			base["owner"] = (item.owner as unknown as PlaylistOwner).display_name
		}

		return base
	})
}

function RecentlyListened() {
	const { expanded } = useSidebar()

	const recentlyListened = getRecentlyListened()

	const artistsQuery = useArtists({ artistsIds: recentlyListened.artist })
	const albumsQuery = useAlbums({ albumIds: recentlyListened.album })
	const playlistsQuery = usePlaylists({
		playlistIds: recentlyListened.playlist,
	})

	const isFetching =
		artistsQuery.isFetching ||
		albumsQuery.isFetching ||
		playlistsQuery.isFetching

	const recent = useMemo((): CardType[] => {
		return noramlizeData([
			...artistsQuery.data,
			...albumsQuery.data,
			...playlistsQuery.data,
		])
	}, [artistsQuery, albumsQuery, playlistsQuery])

	return (
		<ul
			role="list"
			tabIndex={0}
			className={cn("m-2", {
				"m-1": !expanded,
			})}
		>
			{isFetching ? (
				<CardSkeletons count={10} />
			) : (
				recent.map(item => (
					<SidebarItem key={item.id}>
						<Card cardData={item} />
					</SidebarItem>
				))
			)}
		</ul>
	)
}

export default RecentlyListened
