import { QueryClient } from "@tanstack/react-query"

const queryOptions = {
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
			slateTime: 60 * 1000 * 60 * 24,
		},
	},
}

export const queryClient = new QueryClient(queryOptions)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type QueryConfig<T extends (...args: any[]) => any> = Omit<
	ReturnType<T>,
	"queryKey" | "queryFn"
>
