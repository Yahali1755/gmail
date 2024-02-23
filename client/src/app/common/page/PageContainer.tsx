import { FC, ReactNode } from "react";

import { Grid } from "@mui/material";

interface PageContainerProps {
    children: ReactNode
}

const PageContainer: FC<PageContainerProps> = ({ children }) =>
    <Grid container height='100%' width="100%" alignItems='baseline' justifyContent='center'>
    { children }
    </Grid>

export default PageContainer;