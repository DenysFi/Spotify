import { Button } from "@/components/ui/button"
import TracksTable from "./tracks-table"
import { Clock, Play } from "lucide-react"
import { convertTime } from "@/utils/convert-time"
import { usePlaylistTracks } from "../api/get-playlist-tracks"
import { useEffect } from "react"
import type { TrackItemsType } from "../api/get-playlists"
import { month } from "../contants"
import { useInView } from "@/hooks/use-in-view"

function PlaylistTracks({ id }: { id: string | undefined }) {
	const {
		isFetched,
		isFetchingNextPage,
		hasNextPage,
		data,
		isLoading,
		isFetching,
		fetchNextPage,
	} = usePlaylistTracks({
		playlistId: id ?? "",
	})

	const tracks = data?.pages.reduce((acc, page) => {
		return [...acc, ...page.items]
	}, [] as GetPlaylistTrackReturn) as TrackItemsType[] | undefined

	const { inView, ref } = useInView()

	useEffect(() => {
		if (!inView) return

		fetchNextPage()
	}, [fetchNextPage, inView])

	return (
		<div className="p-[var(--content-spacing)] " key={id}>
			<>
				<TracksTable
					isLoading={
						!tracks?.length || isFetching || isLoading || isFetchingNextPage
					}
					data={tracks}
					columns={[
						{
							title: "#",
							field: "#",
							Cell: ({ index }) => {
								return (
									<>
										<span className="group-hover:hidden absolute right-1 top-[50%] translate-y-[-50%] pointer-events-none">
											{index}
										</span>
										<Button
											className="group-hover:block hidden "
											variant={"iconTransparent"}
											size={"icon"}
										>
											<Play
												width={"16"}
												height={"16"}
												fill="white"
												stroke="white"
											/>
										</Button>
									</>
								)
							},
						},
						{
							title: "Название",
							field: "track",
							Cell: ({ entry: { track } }) => {
								return (
									<div className="flex items-center gap-2">
										<div className="h-[2.5rem] w-[2.5rem] rounded-[4px] overflow-hidden shrink-0">
											<img
												loading="eager"
												src={track.album.images[0].url}
												alt=""
											/>
										</div>
										<div>
											<div className="leading-6 text-ellipsis-custom">
												{track.name}
											</div>
											<a
												className="hover:underline text-sm text-textButton group-hover:text-white text-ellipsis-custom"
												href="#"
											>
												{track.artists.map(artist => artist.name).join(", ")}
											</a>
										</div>
									</div>
								)
							},
						},
						{
							title: "Альбом",
							field: "album",
							Cell: ({ entry }) => {
								return (
									<span className="text-sm text-textButton">
										<a
											className="text-ellipsis-custom group-hover:text-white"
											href="#"
										>
											{entry.track.album.name}
										</a>
									</span>
								)
							},
						},
						{
							title: "Дата добавления",
							field: "added_at",
							Cell: ({ entry: { added_at } }) => {
								const date = new Date(added_at)
								return (
									<span className="text-sm text-textButton">
										{date.getDate()} {month[date.getMonth()]}{" "}
										{date.getFullYear()}
										г.
									</span>
								)
							},
						},
						{
							title: <Clock className="text-textButton h-4 w-4" />,
							field: "duration_ms",
							Cell: ({ entry }) => {
								const [_, m, s] = convertTime(entry.track.duration_ms)
								return (
									<span className="text-sm text-textButton">
										{m}:{s.toString().padStart(2, "0")}
									</span>
								)
							},
						},
					]}
				/>
				{isFetched && hasNextPage && (
					<div
						ref={ref}
						className="-translate-y-4 w-full h-[1px] opacity-0"
					></div>
				)}
			</>
		</div>
	)
}

export default PlaylistTracks
