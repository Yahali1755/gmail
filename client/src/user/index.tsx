import { FC } from "react";
import { Grid } from "@mui/material"

import LoginForm from "./LoginForm";
import PageContainer from "../common/PageContainer";

const styles = {
    formContainer: {
        height: '500px',
        width: '400px',
        border: '1px solid lightgrey'
    }
};

export const Login: FC = () => 
    <PageContainer>
        <Grid item sx={styles.formContainer}>
            <LoginForm/>
        </Grid>
    </PageContainer>