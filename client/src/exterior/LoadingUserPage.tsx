import { CssBaseline, Grid, Typography, CircularProgress } from '@mui/material'
import React from 'react'

const LoadingUserPage = () => 
    <CssBaseline>
        <Grid container spacing={2} minHeight="100vh" justifyContent='center' alignItems='center'>
            <Grid item>
                <Typography fontSize="2em">Loading User</Typography>
            </Grid>
            <Grid item>
                <CircularProgress size={80}/>
            </Grid>
        </Grid>
    </CssBaseline>


export default LoadingUserPage