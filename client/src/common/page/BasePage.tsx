import { CssBaseline, Grid } from "@mui/material";
import { FC, ReactNode } from "react";

interface BasePageProps {
    children: ReactNode
}

const BasePage: FC<BasePageProps> = ({ children }) => 
    <CssBaseline>
        <Grid container height='100%' width="100%" alignItems='baseline' justifyContent='center'>
        { children }
        </Grid>
    </CssBaseline>

export default BasePage;