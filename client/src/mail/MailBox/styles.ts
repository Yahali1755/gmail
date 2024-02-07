import { useTheme } from "@mui/material";

export const useTableStyles = () => {
    const theme = useTheme();
    
    return {
        container: {
            flex: 1,
            display: "flex",
            width: "100%",
            height: '100%',
            padding: theme.spacing(6, 6, 2, 0),
            borderRadius: theme.spacing(1)
        },
        tableContainer: {
            borderRadius: theme.spacing(1.5),
            overflow: 'auto',
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
            },
            boxShadow: theme.shadows[4],
        },
    }
}