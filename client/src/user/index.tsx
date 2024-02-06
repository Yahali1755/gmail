import { FC } from "react";
import { Grid, SxProps, Theme, useTheme } from "@mui/material"

import UserForm from "./UserForm";
import PageContainer from "../common/PageContainer";
import { RouteType } from "../routes";

const getUserFormContainerStyles: SxProps = (theme: Theme) => ({
    height: '500px',
    width: '400px',
    border: `1px solid ${theme.palette.text.primary}`,
    marginTop: 'auto',
    marginBottom: 'auto'
})

const User: FC = () => {
    const theme = useTheme();

    return (
        <PageContainer>
            <Grid item sx={getUserFormContainerStyles(theme)}>
                <UserForm/>
            </Grid>
        </PageContainer>
    )
}

export default {
    path: "/",
    component: User
} as RouteType