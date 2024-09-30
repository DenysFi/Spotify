import { api } from "@/lib/api-client"
import type { QueryConfig } from "@/lib/client-query"
import { queryOptions, useQuery } from "@tanstack/react-query"

export type GetArtistsReturn = {
	genres: string[]
	id: string
	images: { url: string }[]
	name: string
	type: "atrist"
	popularity: number
	followers: { total: number }
}

export const getArtists = async (ids: string): Promise<GetArtistsReturn[]> => {
	const { data } = await api.get(`/artists?ids=${ids}`)
	return data.artists
}

export const getArtistsQueryOptions = (artistIds: string[]) => {
	const ids = artistIds.toString()

	return queryOptions({
		queryKey: ["artists", ids],
		queryFn: () => getArtists(ids),
		initialData: [],
		refetchInterval: 1000 * 60 * 60 * 24,
	})
}

type UseArtistsOptions = {
	artistsIds: string[]
	queryConfig?: QueryConfig<typeof getArtistsQueryOptions>
}

export const useArtists = ({ artistsIds, queryConfig }: UseArtistsOptions) => {
	return useQuery({
		...getArtistsQueryOptions(artistsIds),
		...queryConfig,
	})
}
