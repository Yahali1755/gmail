import { ReactNode, FC } from "react"

import { ThemeProvider } from "./theme/ThemeProvider";

interface ProvidersProps {
    children: ReactNode
}

const Providers: FC<ProvidersProps> = ({ children}) =>
    <>
        <ThemeProvider>
            { children }
        </ThemeProvider>
    </>

export default Providers;