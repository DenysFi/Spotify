import { useParams } from "react-router-dom"
import { usePlaylist } from "../api/get-playlist"
import { useColor } from "@/hooks/use-color"
import PlaylistHeader from "./playlist-header"
import PlaylistControl from "./playlist-control"
import PlaylistTracks from "./playlist-tracks"
import { ContentNotFound } from "./content-not-found"

function PlaylistView() {
	const { playlistId } = useParams()

	const query = usePlaylist({ playlistId: playlistId ?? "" })
	const playlistData = query.data

	const bgColor = useColor(query.data?.images[0]?.url || "")

	const tracksTotalDurationMs =
		query.data?.tracks.items.reduce(
			(acc, item) => (acc += +item.track.duration_ms),
			0
		) || 0

	if (query.isError) {
		return <ContentNotFound />
	}

	return (
		<section className="@container relative	">
			<PlaylistHeader
				isLoading={query.isLoading}
				data={{
					image: playlistData?.images[0]?.url,
					name: playlistData?.name,
					description: playlistData?.description,
					display_name: playlistData?.owner.display_name,
					total: playlistData?.tracks.total,
					totalDuration: tracksTotalDurationMs,
				}}
			/>
			<div className="relative">
				<div
					className="absolute left-0 top-0 w-full h-[14.5rem] tracks-bg"
					style={{ backgroundColor: bgColor }}
				></div>
				<PlaylistControl />
				<PlaylistTracks id={playlistData?.id} />
			</div>
		</section>
	)
}

export default PlaylistView
