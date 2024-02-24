import { FC, ReactNode } from "react";
import { Grid, SxProps } from "@mui/material"

import PageContainer from "../common/page/PageContainer";

const formContainerStyles: SxProps = ({
    height: '500px',
    width: '400px',
    border: `1px solid`,
    justifyContent: 'center',
    alignItems: 'baseline',
    alignSelf: 'center'
})

interface BaseAuthPageProps {
    children: ReactNode
}

const BaseAuthPage: FC<BaseAuthPageProps> = ({ children }) => 
    <PageContainer>
        <Grid container sx={formContainerStyles}>
            <Grid xs={9} item>
              { children }
            </Grid>
        </Grid>
    </PageContainer>


export default BaseAuthPage;