import { useState, createContext, ReactNode, FC} from 'react'
import { ThemeProvider as MuiThemeProvider } from '@mui/material';

import { darkTheme, lightTheme } from '../theme/themes';
import { useAuth } from './auth';
import { useUserApi } from '../api/hooks/user-api';

export const ThemeContext = createContext(null);

export const ThemeProvider: FC<{children: ReactNode}> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const { user } = useAuth()
    const userApi = useUserApi();

    const changeTheme = () => {
        userApi.changeTheme({id: user.id})

        // setIsDarkMode();
    }

    return (
        <ThemeContext.Provider value={{isDarkMode, changeTheme}}>
            <MuiThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
                { children }
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};