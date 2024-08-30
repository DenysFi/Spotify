import { env } from "@/config/env"
import { api } from "@/lib/api-client"
import type { QueryConfig } from "@/lib/client-query"
import { queryOptions, useQuery } from "@tanstack/react-query"
import axios from "axios"

type GetTokenReturn = {
	access_token: string
	token_type: string
	expires_in: number
}

export const getToken = async (): Promise<GetTokenReturn> => {
	try {
		const { data } = await axios("https://accounts.spotify.com/api/token", {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Authorization: `Basic ${btoa(
					env.SPOTIFY_CLIENT_ID + ":" + env.SPOTIFY_CLIENT_SECRET
				)}`,
			},
			data: "grant_type=client_credentials",
			method: "POST",
		})

		api.defaults.headers.common[
			"Authorization"
		] = `Bearer ${data?.access_token}`

		localStorage.setItem("token", JSON.stringify(data.access_token))

		return data
	} catch (e) {
		console.error("Error getting token")
		throw new Error("Error getting token")
	}
}

export const getTokenQueryOptions = () => {
	return queryOptions({
		queryKey: ["token"],
		queryFn: getToken,
		refetchInterval: 1000 * 60 * 60 * 24,
	})
}

type UseTokenOptions = {
	queryConfig?: QueryConfig<typeof getTokenQueryOptions>
}

export const useToken = ({ queryConfig }: UseTokenOptions = {}) => {
	return useQuery({
		...getTokenQueryOptions(),
		...queryConfig,
	})
}
