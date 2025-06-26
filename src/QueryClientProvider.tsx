"use client"
import { QueryClient, QueryClientProvider as ReactQueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
function QueryClientProvider({ children }: PropsWithChildren) {
    const queryClient = new QueryClient();
    // this contains the cache for the data we get from the backend
    return (
        <ReactQueryClientProvider client={queryClient}>
            {children}
        </ReactQueryClientProvider>
    )
}

export default QueryClientProvider
