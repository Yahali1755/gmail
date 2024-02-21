import { useTheme } from "@mui/material";

export const useTableStyles = () => {
    const theme = useTheme();
    
    return {
        container: {
            flex: 1,
            display: "flex",
            width: "100%",
            height: '100%',
            borderRadius: theme.spacing(1.5),
            padding: theme.spacing(0, 6, 2, 0)
        },
        tableContainer: {
            flexDirection: 'column',
            height: '100%',
            flex: 1
        },
        paginationContainer: {
            borderBottom: `1px solid ${theme.palette.divider}`
        },
        tableContentContainer: {
            overflow: 'auto',
            boxShadow: theme.shadows[4]
        }
    }
}