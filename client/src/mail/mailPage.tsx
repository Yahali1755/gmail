import { Grid, Typography } from "@mui/material";

import DarkModeToggle from "../theme/ToggleTheme"
import MailBox from "./mail-box";
import Navbar from "./navbar";
import MailIconButton from "./MailIconButton";

export const MailPage = () => {
    return (
        <Grid container height='100vh' alignItems='center' justifyContent='center'>
            <Grid position="absolute" left={0} top={0} container>
                <MailIconButton/>
            </Grid>
            <Navbar/>
            <Grid left="150px" justifyContent='center' height="85vh" width='70vw' container>
                <MailBox/>
            </Grid>
            <DarkModeToggle/>
        </Grid>
    )
}
