import { useParams } from "react-router-dom"
import { usePlaylist } from "../api/get-playlist"
import { useColor } from "@/hooks/use-color"
import PlaylistHeader from "./playlist-header"
import PlaylistControl from "./playlist-control"
import PlaylistTracks from "./playlist-tracks"
import { ContentNotFound } from "./content-not-found"
import {
	getTrackDuration,
	type GetTrackDurationProps,
} from "@/utils/tracks-utils"

function PlaylistView() {
	const { playlistId } = useParams()

	const query = usePlaylist({ playlistId: playlistId as string })
	const playlistData = query.data

	const bgColor = useColor(query.data?.images[0]?.url)

	const tracksTotalDurationMs = getTrackDuration(
		query.data?.tracks.items as GetTrackDurationProps[] | undefined
	)

	if (query.isError) {
		return <ContentNotFound />
	}

	return (
		<section className="@container relative	">
			<PlaylistHeader
				isLoading={query.isLoading}
				data={{
					label: "Плейлист",
					image: playlistData?.images[0].url,
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
				<PlaylistTracks id={playlistId!} />
			</div>
		</section>
	)
}

export default PlaylistView
