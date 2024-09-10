import { api } from "@/lib/api-client"
import type { QueryConfig } from "@/lib/client-query"
import { queryOptions, useQuery } from "@tanstack/react-query"
import type { GetPlaylistReturn } from "./get-playlists"

export const getPlaylist = (playlistId: string): Promise<GetPlaylistReturn> => {
	return api.get(`/playlists/${playlistId}`).then(res => res.data)
}

export const getPlaylistQueryOptions = (playlistId: string) => {
	return queryOptions({
		queryKey: ["playlist", playlistId],
		queryFn: () => getPlaylist(playlistId),
	})
}
type UsePlaylistOptions = {
	playlistId: string
	queryConfig?: QueryConfig<typeof getPlaylistQueryOptions>
}

export const usePlaylist = ({
	playlistId = "",
	queryConfig,
}: UsePlaylistOptions) => {
	return useQuery({
		...getPlaylistQueryOptions(playlistId),
		...queryConfig,
	})
}
