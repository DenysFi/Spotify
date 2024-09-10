import { api } from "@/lib/api-client"
import type { QueryConfig } from "@/lib/client-query"
import { queryOptions, useQuery } from "@tanstack/react-query"
import type { GetAlbumReturn } from "./get-album"

export const getAlbums = async (ids: string): Promise<GetAlbumReturn[]> => {
	const { data } = await api.get(`/albums?ids=${ids}`)
	return data.albums
}

export const getAlbumsQueryOptions = (albumsIds: string[]) => {
	const ids = albumsIds.toString()

	return queryOptions({
		queryKey: ["albums"],
		queryFn: () => getAlbums(ids),
		initialData: [],
		refetchInterval: 1000 * 60 * 60 * 24,
	})
}
type UseAlbumsOptions = {
	albumIds: string[]
	queryConfig?: QueryConfig<typeof getAlbumsQueryOptions>
}

export const useAlbums = ({ albumIds, queryConfig }: UseAlbumsOptions) => {
	return useQuery({
		...getAlbumsQueryOptions(albumIds),
		...queryConfig,
	})
}
