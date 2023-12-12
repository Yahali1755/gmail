import { Grid } from "@mui/material";

import DarkModeToggle from "../theme/ToggleTheme"
import MailBox from "./MailBox";
import Navbar from "./Navbar";
import MailIconButton from "./MailIconButton";

export const MailPage = () => {
    return (
        <Grid container minHeight='100vh' alignItems='center' justifyContent='center'>
            <Grid position="absolute" left={0} top={0} container>
                <MailIconButton/>
            </Grid>
            <Navbar/>
            <Grid item left="150px" justifyContent='center' height="800px" width='1200px' container>
                <MailBox/>
            </Grid>
            <DarkModeToggle/>
        </Grid>
    )
}
