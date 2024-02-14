import { useTheme } from "@mui/material";

export const useTableStyles = () => {
    const theme = useTheme();
    
    return {
        container: {
            flex: 1,
            display: "flex",
            width: "100%",
            height: '100%',
            borderRadius: theme.spacing(1.5)
        },
        tableContainer: {
            overflow: 'auto',
            boxShadow: theme.shadows[4],
            margin: theme.spacing(0, 6, 2, 0)
        },
    }
}