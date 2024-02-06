import { useTheme } from "@mui/material";

export const useSideBarStyles = () => {
    const theme = useTheme();

    console.log(theme.palette.background.default)
    return {
        drawer: {
            style: {
                boxShadow: 'none',
            },
            background: 'transparent',
        }
    }
}