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

export type GetAlbumReturn = {
	album_type: "album" | "single" | "compilation"
	total_tracks: number
	id: string
	images: { url: string }[]
	name: string
	release_date: string
	type: "album"
	artists: Omit<
		GetArtistsReturn,
		"followers" | "genres" | "images" | "popularity"
	>
	popularity: number
}

export const getAlbums = async (ids: string): Promise<GetAlbumReturn[]> => {
	const { data } = await api.get(`/albums?ids=${ids}`)
	return data.albums
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
export const getAlbumsQueryOptions = (albumsIds: string[]) => {
	const ids = albumsIds.toString()

	return queryOptions({
		queryKey: ["albums"],
		queryFn: () => getAlbums(ids),
		initialData: [],
		refetchInterval: 1000 * 60 * 60 * 24,
	})
}

type UseArtistsOptions = {
	artistsIds: string[]
	queryConfig?: QueryConfig<typeof getArtistsQueryOptions>
}
type UseAlbumsOptions = {
	albumIds: string[]
	queryConfig?: QueryConfig<typeof getAlbumsQueryOptions>
}

export const useArtists = ({ artistsIds, queryConfig }: UseArtistsOptions) => {
	return useQuery({
		...getArtistsQueryOptions(artistsIds),
		...queryConfig,
	})
}
export const useAlbums = ({ albumIds, queryConfig }: UseAlbumsOptions) => {
	return useQuery({
		...getAlbumsQueryOptions(albumIds),
		...queryConfig,
	})
}
