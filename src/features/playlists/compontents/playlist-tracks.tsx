import { Button } from "@/components/ui/button"
import TracksTable from "./tracks-table"
import { Clock, Play } from "lucide-react"
import { convertTime } from "@/utils/convert-time"
import { usePlaylistTracks } from "../api/get-playlist-tracks"
import { month } from "../contants"
import { concatPages, joinArtists } from "@/utils/tracks-utils"
import InfiniteScroll from "@/components/ui/infinite-scroll/infinite-scroll"
import { Link } from "react-router-dom"

function PlaylistTracks({ id }: { id: string }) {
	const {
		isFetched,
		isFetchingNextPage,
		hasNextPage,
		data,
		isLoading,
		fetchNextPage,
	} = usePlaylistTracks({
		playlistId: id,
	})

	const tracks = concatPages(data?.pages)

	return (
		<div className="p-[var(--content-spacing)] " key={id}>
			<InfiniteScroll show={isFetched && hasNextPage} callback={fetchNextPage}>
				<TracksTable
					ids={tracks?.map(item => item.track.id)}
					isLoading={!data || isLoading || isFetchingNextPage}
					data={tracks}
					columns={[
						{
							title: "#",
							field: "#",
							Cell: ({ index }) => {
								return (
									<>
										<span className="group-hover:hidden absolute right-1 top-[50%] translate-y-[-50%] pointer-events-none">
											{index + 1}
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
												src={track.album.images.reverse()[0].url}
												alt={track.album.name}
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
												{joinArtists(track.artists)}
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
									<span className="text-sm text-textButton hover:underline">
										<Link
											className="text-ellipsis-custom group-hover:text-white"
											to={`../album/${entry.track.album.id}`}
										>
											{entry.track.album.name}
										</Link>
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
								const [h, m, s] = convertTime(entry.track.duration_ms)
								return (
									<span className="text-sm text-textButton">
										{m}:{s.toString().padStart(2, "0")}
									</span>
								)
							},
						},
					]}
				/>
			</InfiniteScroll>
		</div>
	)
}

export default PlaylistTracks
