import { useTheme } from "@mui/material";

export const useTableStyles = () => {
    const theme = useTheme();
    
    return {
        container: {
            flex: 1,
            display: "flex",
            width: "100%",
            height: '85%',
            padding: theme.spacing(0, 6, 2, 0),
        },
        tableContainer: {
            borderRadius: theme.spacing(1.5),
            overflow: 'auto',
            boxShadow: theme.shadows[4],
        },
    }
}