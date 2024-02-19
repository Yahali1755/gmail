import { FC } from "react";
import { Grid, SxProps, Theme, useTheme } from "@mui/material"

import UserForm from "./UserForm";
import PageContainer from "../common/page/PageContainer";
import { RouteType } from "../shell/Routes";

const formContainerStyles: SxProps = ({
    height: '500px',
    width: '400px',
    border: `1px solid`,
    justifyContent: 'center',
    alignItems: 'baseline'
})

const User: FC = () => 
    <PageContainer>
        <Grid container sx={formContainerStyles}>
            <Grid xs={9} item>
                <UserForm/>
            </Grid>
        </Grid>
    </PageContainer>


export default {
    path: "/",
    component: User
} as RouteType