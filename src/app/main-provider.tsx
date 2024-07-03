import { queryClient } from '@/lib/client-query';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react'
import { HelmetProvider } from 'react-helmet-async';

function AppProvider({ children }:
    { children: React.ReactNode }
) {
    return (
        <React.Suspense>
            <HelmetProvider>
                <QueryClientProvider client={queryClient}>
                    <ReactQueryDevtools />
                    {children}
                </QueryClientProvider>
            </HelmetProvider>
        </React.Suspense>
    )
}
export default AppProvider;