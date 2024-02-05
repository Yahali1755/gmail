import { useTheme } from "@mui/material";

export const useTableStyles = () => {
    const theme = useTheme();
    
    return {
        container: {
            flex: 1,
            display: "flex",
            width: "100%",
            height: "100%",
            margin: theme.spacing(4, 8, 4, 20)
        },
        tableContainer: {
            flex: 1,
            overflow: 'auto',
            '&::-webkit-scrollbar': {
                width: '8px',
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: theme.palette.text.primary,
                borderRadius: '4px',
            },
            '&::-webkit-scrollbar-track': {
                backgroundColor: theme.palette.background.default,
                borderRadius: '4px',
            },
            boxShadow: theme.shadows[3],
        },
    }
}