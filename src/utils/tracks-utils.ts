import type { GetArtistsReturn } from "@/features/media-library/api/get-recently-listened"
import type { GetPlaylistTrackReturn } from "@/features/playlists/api/get-playlist-tracks"
import type { TrackItemsType } from "@/features/playlists/api/get-playlists"

export type ArtistType = Pick<GetArtistsReturn, "id" | "name" | "type">

export function joinArtists(artists?: ArtistType[]) {
	return artists?.map(artist => artist.name).join(", ") ?? ""
}

export function concatPages(pages: GetPlaylistTrackReturn[] = []) {
	return pages.reduce(
		(acc, page) => [...acc, ...page.items],
		[] as TrackItemsType[]
	)
}

export type GetTrackDurationProps = {
	duration_ms: string
}

export function getTrackDuration(tracks: GetTrackDurationProps[] = []) {
	return tracks.reduce((acc, item) => (acc += +item.duration_ms), 0)
}
