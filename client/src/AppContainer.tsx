import { Box } from "@mui/material";
import { FC, ReactNode } from "react";

interface AppContainerProps {
    children: ReactNode
}

const AppContainer: FC<AppContainerProps> = ({children}) => 
    <Box height="100vh" display='flex' flexDirection='column'>
        { children }
    </Box>

export default AppContainer;