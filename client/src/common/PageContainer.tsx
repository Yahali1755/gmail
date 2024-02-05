import { Grid } from "@mui/material";

import DarkModeToggle from "../theme/ToggleTheme";
import AuthWrapper from "../routes/AuthWrapper";

const PageContainer = ({ children }) =>
    <AuthWrapper>
        <Grid container direction='column' overflow='auto' width="100%" minHeight='100vh' alignItems='baseline' 
            justifyContent='center'>
            { children }
            <DarkModeToggle/>
        </Grid>
    </AuthWrapper>

export default PageContainer;