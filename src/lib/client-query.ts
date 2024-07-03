import { QueryClient } from "@tanstack/react-query";

const queryOptions = {
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
            slateTime: 60 * 1000,

        },
    },
}

export const queryClient = new QueryClient(queryOptions)
