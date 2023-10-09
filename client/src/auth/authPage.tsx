import { FC } from "react";
import { Grid } from "@mui/material"

import { AuthForm } from "./authForm";
import DarkModeToggle from "../theme/ToggleTheme";

const styles = {
    formContainer: {
        height: '500px',
        width: '400px',
        border: '1px solid lightgrey'
    }
};

export const AuthPage: FC = () => 
    <Grid container height='100vh' alignItems='center' justifyContent='center'>
        <Grid justifyContent='center' container sx={styles.formContainer}>
            <AuthForm/>
        </Grid>
        <DarkModeToggle/>
    </Grid>


