import type {
	TrackItemType,
	TracksType,
} from "@/features/playlists/api/get-playlists"
import { api } from "@/lib/api-client"
import type { QueryConfig } from "@/lib/client-query"
import type { ArtistType } from "@/utils/tracks-utils"
import { queryOptions, useQuery } from "@tanstack/react-query"

type AlbumTracksType = Omit<TracksType, "items"> & {
	items: TrackItemType[]
}

export type AlbumCopyType = {
	text: string
	type: string
}

export type GetAlbumReturn = {
	album_type: "album" | "single" | "compilation"
	total_tracks: number
	id: string
	images: { url: string }[]
	name: string
	release_date: string
	type: "album"
	artists: ArtistType[]
	tracks: AlbumTracksType
	popularity: number
	copyrights: AlbumCopyType[]
}

export const getAlbum = (albumId: string): Promise<GetAlbumReturn> => {
	return api.get(`/albums/${albumId}`).then(res => res.data)
}

export const getAlbumQueryOptions = (albumId: string) => {
	return queryOptions({
		queryKey: ["album", albumId],
		queryFn: () => getAlbum(albumId),
	})
}
type UsePlaylistOptions = {
	albumId: string
	queryConfig?: QueryConfig<typeof getAlbumQueryOptions>
}

export const useAlbum = ({ albumId = "", queryConfig }: UsePlaylistOptions) => {
	return useQuery({
		...getAlbumQueryOptions(albumId),
		...queryConfig,
	})
}
