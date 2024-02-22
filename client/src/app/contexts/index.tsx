import { ReactNode, FC } from "react"

import { ThemeProvider } from "./theme";
import AuthProvider from "./auth";
import QueryProvider from "./query";
import { AlertsProvider } from "./alerts";

interface ProvidersProps {
    children: ReactNode
}

const Providers: FC<ProvidersProps> = ({ children }) =>
    <ThemeProvider>
        <QueryProvider>
            <AlertsProvider>
                <AuthProvider>
                    { children }
                </AuthProvider>
            </AlertsProvider>
        </QueryProvider>
    </ThemeProvider>

export default Providers;