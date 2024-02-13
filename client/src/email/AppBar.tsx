import LogoutIcon from '@mui/icons-material/Logout';
import { AppBar as MuiAppBar, Grid, useTheme, SxProps } from '@mui/material';

import ThemeToggler from '../theme/ThemeToggler';
import HomePageIconButton from './SideBar/HomePageIconButton';
import LogoutButton from '../common/LogoutButton';

const AppBar = () => {
    const theme = useTheme()

    const styles: SxProps = {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary
    }

    return (
        <MuiAppBar position="static" sx={styles} elevation={0}>
                <Grid width="100%" container>
                    <Grid xs={2} item>
                        <HomePageIconButton/>
                    </Grid>
                    <Grid xs={10} item>
                        <Grid justifyContent='flex-end' container>
                            <Grid item>
                                <LogoutButton/>
                            </Grid>
                            <Grid item>
                                <ThemeToggler/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
        </MuiAppBar>
    )
}

export default AppBar
