import { FC } from "react";
import { Grid, SxProps } from "@mui/material"

import UserForm from "./UserForm";
import PageContainer from "../common/page/PageContainer";
import { RouteType } from "../shell/Routes";
import { Route } from "../constants/Route";

const formContainerStyles: SxProps = ({
    height: '500px',
    width: '400px',
    border: `1px solid`,
    justifyContent: 'center',
    alignItems: 'baseline',
    alignSelf: 'center'
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
    path: Route.Login,
    component: User
} as RouteType