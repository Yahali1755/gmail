import { ReactNode, FC } from "react"
import { QueryClient, QueryClientProvider } from 'react-query'
import { ThemeProvider } from "./theme/ThemeProvider";
import AuthProvider from "./contexts/auth";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

const queryClient = new QueryClient()

interface ProvidersProps {
    children: ReactNode
}

const Providers: FC<ProvidersProps> = ({ children}) =>
    <>
        <ThemeProvider>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router}>
                    <AuthProvider>
                        { children }
                    </AuthProvider>
                </RouterProvider>
            </QueryClientProvider>
        </ThemeProvider>
    </>

export default Providers;