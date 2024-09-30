import { api } from "@/lib/api-client"
import type { QueryConfig } from "@/lib/client-query"
import { queryOptions, useQuery } from "@tanstack/react-query"
import type { GetAlbumReturn } from "./get-album"

type GetUserAlbumsParams = {
	userID: string | undefined
	limit?: number
	offset?: number
}

export const getUserAlbums = ({
	userID,
	limit,
	offset,
}: GetUserAlbumsParams): Promise<GetAlbumReturn[]> => {
	return api
		.get(`/artists/${userID}/albums`, {
			params: {
				limit,
				offset,
			},
		})
		.then(res => res.data)
}

export const getUserAlbumsQueryOptions = ({
	userID,
	limit,
	offset,
}: GetUserAlbumsParams) => {
	return queryOptions({
		queryKey: ["artists", userID, "albums"],
		queryFn: () => getUserAlbums({ userID, limit, offset }),
	})
}
type UseUserAlbumsOptions = GetUserAlbumsParams & {
	queryConfig?: QueryConfig<typeof getUserAlbumsQueryOptions>
}

export const useUserAlbums = ({
	userID = "",
	limit = 10,
	offset = 0,
	queryConfig,
}: UseUserAlbumsOptions) => {
	return useQuery({
		...getUserAlbumsQueryOptions({ userID, limit, offset }),
		...queryConfig,
	})
}
