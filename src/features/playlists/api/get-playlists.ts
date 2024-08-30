import type {
	GetAlbumReturn,
	GetArtistsReturn,
} from "@/features/media-library/api/get-recently-listened"
import { api } from "@/lib/api-client"
import type { QueryConfig } from "@/lib/client-query"
import { queryOptions, useQuery } from "@tanstack/react-query"

type TrackItemsType = {
	added_at: string
	added_by: {
		id: string
		type: "user"
	}
	track: TrackItemType
}
type TrackItemType = {
	duration_ms: string
	id: string
	name: string
	popularity: number
	type: "track"
	album: Omit<GetAlbumReturn, "popularity">
	artists: Pick<GetArtistsReturn, "id" | "name" | "type">[]
}

type TracksType = {
	items: TrackItemsType[]
	total: number
}

export type GetPlaylistReturn = {
	description: string
	owner: { display_name: string }
	id: string
	images: { url: string }[]
	name: string
	type: "playlist"
	followers: { total: number }
	tracks: TracksType
}

export const getPlaylists = async (
	ids: string[]
): Promise<GetPlaylistReturn[]> => {
	const promises = ids.map(id => {
		return api.get(`/playlists/${id}`).then(res => res.data)
	})
	const res = (await Promise.allSettled(promises))
		.filter(res => res.status === "fulfilled")
		.map(res => res.value)

	return res
}

type UsePlaylistsOptions = {
	playlistIds: string[]
	queryConfig?: QueryConfig<typeof getPlaylistsQueryOptions>
}

export const getPlaylistsQueryOptions = (playlistIds: string[]) => {
	return queryOptions({
		queryKey: ["playlists"],
		queryFn: () => getPlaylists(playlistIds),
		initialData: [],
		refetchInterval: 1000 * 60 * 60 * 24,
	})
}

export const usePlaylists = ({
	playlistIds,
	queryConfig,
}: UsePlaylistsOptions) => {
	return useQuery({
		...getPlaylistsQueryOptions(playlistIds),
		...queryConfig,
	})
}
