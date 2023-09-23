import { ThemeProvider } from "./theme/themeProvider";
import { RouterProvider } from "react-router-dom";
import { ReactNode, FC } from "react"

import { router } from "./routes";

interface ProvidersProps {
    children: ReactNode
}

const Providers: FC<ProvidersProps> = ({ children}) => 
    <ThemeProvider>
        <RouterProvider router={router}/>
        { children }
    </ThemeProvider>

export default Providers;