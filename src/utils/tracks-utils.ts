import type { GetArtistsReturn } from "@/features/media-library/api/get-recently-listened"
import type { TrackItemsType } from "@/features/playlists/api/get-playlists"

export type ArtistType = Pick<GetArtistsReturn, "id" | "name" | "type">

export function joinArtists(artists: ArtistType[] | undefined) {
	if (!artists) return ""
	return artists.map(artist => artist.name).join(", ")
}

export function concatPages(pages: any) {
	return pages?.reduce((acc, page) => {
		return [...acc, ...page.items]
	}, []) as TrackItemsType[] | undefined
}

export type GetTrackDurationProps = {
	duration_ms: string
}

export function getTrackDuration(tracks: GetTrackDurationProps[] | undefined) {
	return tracks?.reduce((acc, item) => (acc += +item.duration_ms), 0) || 0
}
