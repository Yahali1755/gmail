import { useState, FC, createContext, ReactNode } from 'react'
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#f6f8fc',
    }
  }
});
  
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#282828',
      paper: '#363636'
    }
  }
});
  

export const ThemeContext = createContext(null);

export const ThemeProvider: FC<{children: ReactNode}> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(true);

    const changeTheme = () => {
        setIsDarkMode((isDarkMode) => !isDarkMode);
    }

    return (
        <ThemeContext.Provider value={{isDarkMode, changeTheme}}>
            <MuiThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
                { children }
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};