import { CssBaseline, Grid } from "@mui/material";
import { FC, ReactNode } from "react";

interface BasePageProps {
    children: ReactNode
}

const BasePage: FC<BasePageProps> = ({ children }) =>
    <CssBaseline>
        <Grid container overflow='auto' width="100%" height='100vh' alignItems='center' 
        justifyContent='baseline'>
        { children }
        </Grid>
    </CssBaseline>

export default BasePage;