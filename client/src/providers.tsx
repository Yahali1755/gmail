import { ReactNode, FC } from "react"
import { QueryClient, QueryClientProvider } from 'react-query'
import { ThemeProvider } from "./theme/ThemeProvider";

const queryClient = new QueryClient()

interface ProvidersProps {
    children: ReactNode
}

const Providers: FC<ProvidersProps> = ({ children}) =>
    <>
        <ThemeProvider>
            <QueryClientProvider client={queryClient}>
                { children }
            </QueryClientProvider>
        </ThemeProvider>
    </>

export default Providers;