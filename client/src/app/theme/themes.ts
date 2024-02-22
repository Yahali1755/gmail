import { ThemeOptions, createTheme } from "@mui/material";

const baseTheme = {
    components: {
        MuiCssBaseline: {
            styleOverrides: (theme) => ({
                '&::-webkit-scrollbar': {
                width: theme.spacing(1),
                height: theme.spacing(1)
                },
                '&::-webkit-scrollbar-thumb': {
                backgroundColor: theme.palette.text.primary,
                borderRadius: theme.spacing(0.5),
                },
                '&::-webkit-scrollbar-track': {
                backgroundColor: theme.palette.background.default,
                borderRadius: theme.spacing(0.5),
            }})
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontSize: '1.05em'
                }
            }
        }
    } 
} as ThemeOptions
  
export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        background: {
        default: '#f6f8fc',
        },
        primary: {
        main: "#000000"
        }
    },
    ...baseTheme
});
    
export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
        default: '#282828',
        paper: '#282828'
        },
        primary: {
        main: "#FFFFFF"
        }
    },
    ...baseTheme
});