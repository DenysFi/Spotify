import PlaylistView from "@/features/playlists/compontents/playlist-view"

// export const playlistLoader =
// 	(queryClient: QueryClient) =>
// 	async ({ params }: LoaderFunctionArgs) => {
// 		const playlistId = params.playlistId as string
// 		const query = getPlaylistQueryOptions(playlistId)
// 		console.log(api.defaults.headers.common.Authorization)
// 		// console.log(
// 		// 	queryClient.getQueryData(query.queryKey) ??
// 		// 		(await queryClient.fetchQuery(query))
// 		// )

// 		// return (
// 		// 	queryClient.getQueryData(query.queryKey) ??
// 		// 	(await queryClient.fetchQuery(query))
// 		// )
// 		return null
// 	}

export function PlaylistRoute() {
	return <PlaylistView />
}
