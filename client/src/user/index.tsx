import { FC } from "react";
import { Grid, SxProps, Theme, useTheme } from "@mui/material"

import UserForm from "./UserForm";
import PageContainer from "../common/page/PageContainer";
import { RouteType } from "../shell/Routes";

const getUserFormContainerStyles: SxProps = ({
    height: '500px',
    width: '400px',
    border: `1px solid`,
    marginTop: 'auto',
    marginBottom: 'auto'
})

const User: FC = () => 
    <PageContainer>
        <Grid item sx={getUserFormContainerStyles}>
            <UserForm/>
        </Grid>
    </PageContainer>


export default {
    path: "/",
    component: User
} as RouteType