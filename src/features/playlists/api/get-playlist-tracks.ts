import { api } from "@/lib/api-client"
import type { QueryConfig } from "@/lib/client-query"
import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query"
import type { TrackItemsType } from "./get-playlists"

export type GetPlaylistTrackReturn = {
	items: TrackItemsType[]
	prevOffset: number
	total: number
}

export const getPlaylistTracks = async ({
	pageParam = 0,
	id,
	limit,
}: {
	pageParam?: number
	id: string
	limit: number
}): Promise<GetPlaylistTrackReturn> => {
	const data = await api
		.get(`/playlists/${id}/tracks`, {
			params: {
				limit: limit,
				offset: pageParam,
			},
		})
		.then(res => res.data)

	return { ...data, prevOffset: pageParam }
}

export const getPlaylistTracksQueryOptions = (
	playlistId: string,
	limit: number
) => {
	return infiniteQueryOptions({
		queryKey: ["playlists", playlistId, "tracks"],
		queryFn: ({ pageParam }: { pageParam: number }) =>
			getPlaylistTracks({ pageParam, id: playlistId, limit }),
		initialPageParam: 0,
		getNextPageParam: lastPage => {
			if (lastPage.prevOffset + limit >= lastPage.total) return null

			return lastPage.prevOffset + limit
		},
	})
}

type UsePlaylistTracksOptions = {
	playlistId: string
	limit?: number
	offset?: number
	queryConfig?: QueryConfig<typeof getPlaylistTracksQueryOptions>
}

export const usePlaylistTracks = ({
	playlistId = "",
	limit = 100,
	queryConfig,
}: UsePlaylistTracksOptions) => {
	return useInfiniteQuery({
		...getPlaylistTracksQueryOptions(playlistId, limit),
		...queryConfig,
	})
}
