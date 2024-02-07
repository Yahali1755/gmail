import { CssBaseline, Grid, Typography, CircularProgress, TypographyProps, CircularProgressProps } from '@mui/material'
import React, { FC } from 'react'

interface LoadingPageProps {
    title?: string,
    circularProgressProps?: CircularProgressProps,
    titleProps?: TypographyProps
}

const LoadingPage: FC<LoadingPageProps> = ({ title, circularProgressProps, titleProps }) => 
    <CssBaseline>
        <Grid container spacing={2} height="100%" justifyContent='center' alignItems='center'>
            { title &&
                <Grid item>
                    <Typography fontSize="2em" {...titleProps}> {title }</Typography>
                </Grid>
            }
            <Grid item>    
                <CircularProgress size={80} {...circularProgressProps}/>
            </Grid>
        </Grid>
    </CssBaseline>


export default LoadingPage