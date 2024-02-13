import { ReactNode, FC } from "react"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

interface QueryProvidersProps {
    children: ReactNode
}

const QueryProvider: FC<QueryProvidersProps> = ({ children }) =>
    <QueryClientProvider client={queryClient}>
        { children }
    </QueryClientProvider>

export default QueryProvider;