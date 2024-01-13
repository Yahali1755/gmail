import { FC } from "react";
import { Grid, SxProps, Theme, useTheme } from "@mui/material"

import LoginForm from "./LoginForm";
import PageContainer from "../common/PageContainer";

const getFormContainerStyles: SxProps = (theme: Theme) => ({
    height: '500px',
    width: '400px',
    border: `1px solid ${theme.palette.text.primary}`
})

export const Login: FC = () => {
    const theme = useTheme();

    return (
        <PageContainer>
            <Grid item sx={getFormContainerStyles(theme)}>
                <LoginForm/>
            </Grid>
        </PageContainer>
    )
}