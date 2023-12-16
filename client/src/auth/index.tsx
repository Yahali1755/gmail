import { FC } from "react";
import { Grid } from "@mui/material"

import AuthForm from "./authForm";
import PageContainer from "../common/PageContainer";

const styles = {
    formContainer: {
        height: '500px',
        width: '400px',
        border: '1px solid lightgrey'
    }
};

export const Auth: FC = () => 
    <PageContainer>
        <Grid item sx={styles.formContainer}>
            <AuthForm/>
        </Grid>
    </PageContainer>