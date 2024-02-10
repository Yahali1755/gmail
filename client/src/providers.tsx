import { ReactNode, FC } from "react"

import { ThemeProvider } from "./contexts/theme";
import AuthProvider from "./contexts/auth";
import QueryProvider from "./contexts/query";
import { AlertsProvider } from "./contexts/alerts";

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