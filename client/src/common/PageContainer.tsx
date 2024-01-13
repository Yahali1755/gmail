import { Grid } from "@mui/material";

import DarkModeToggle from "../theme/ToggleTheme";

const PageContainer = ({ children }) => 
    <Grid container sx={{overflow: "auto"}} minHeight='100vh' alignItems='center' 
        justifyContent='center'>
        { children }
        <DarkModeToggle/>
    </Grid>

export default PageContainer;
