import { Grid } from "@mui/material";

import DarkModeToggle from "../theme/ToggleTheme";
import AuthWrapper from "../routes/AuthWrapper";

const PageContainer = ({ children }) =>
    <AuthWrapper>
        <Grid container sx={{overflow: "auto"}} minHeight='100vh' alignItems='center' 
            justifyContent='center'>
            { children }
            <DarkModeToggle/>
        </Grid>
    </AuthWrapper>

export default PageContainer;