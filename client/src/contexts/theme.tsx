import { useState, createContext, ReactNode, FC, useEffect, useContext} from 'react'
import { ThemeProvider as MuiThemeProvider } from '@mui/material';

import { darkTheme, lightTheme } from '../theme/themes';

interface ThemeContextProps {
    isDarkTheme: boolean,
    changeTheme: () => void
}

export const ThemeContext = createContext<ThemeContextProps>(null);

interface ThemeProviderProps {
    children: ReactNode
}

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const changeTheme = () => {
        setIsDarkTheme(!isDarkTheme);

        localStorage.setItem("isDarkTheme", `${!isDarkTheme}`)
    }

    useEffect(() => {
        const isDark = localStorage.getItem("isDarkTheme") === "true" 

        setIsDarkTheme(isDark)
    }, [])

    return (
        <ThemeContext.Provider value={{isDarkTheme, changeTheme}}>
            <MuiThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
                { children }
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};