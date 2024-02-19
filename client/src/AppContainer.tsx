import { FC, ReactNode } from 'react';
import { Box, CssBaseline } from '@mui/material';

interface AppContainerProps {
    children: ReactNode
}

const AppContainer: FC<AppContainerProps> = ({ children }) =>
    <CssBaseline>
        <Box sx={{height: '100vh'}}>
            { children }
        </Box> 
    </CssBaseline>

export default AppContainer;