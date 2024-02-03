import { ReactNode, FC } from "react"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from "./theme/ThemeProvider";
import AuthProvider from "./contexts/auth";

const queryClient = new QueryClient()

interface ProvidersProps {
    children: ReactNode
}

const Providers: FC<ProvidersProps> = ({ children }) =>
    <>
        <ThemeProvider>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    { children }
                </AuthProvider>
            </QueryClientProvider>
        </ThemeProvider>
    </>

export default Providers;