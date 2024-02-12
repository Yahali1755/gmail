import { useState, createContext, ReactNode, FC, useContext} from 'react'
import { ThemeProvider as MuiThemeProvider } from '@mui/material';

import { darkTheme, lightTheme } from '../theme/themes';

export const ThemeContext = createContext(null);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: FC<{children: ReactNode}> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const changeTheme = () => {
        setIsDarkMode(isDarkMode => !isDarkMode);
    }

    return (
        <ThemeContext.Provider value={{isDarkMode, changeTheme}}>
            <MuiThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
                { children }
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};