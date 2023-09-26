import { Grid } from "@mui/material";

import DarkModeToggle from "../theme/toggleTheme"
import MailBox from "./mailbox";
import { Icon } from "@mui/material"

const styles = {
    mailboxContainer: {
        height: '85vh',
        width: '80vw',
        border: '1px solid lightgrey'
    }
};

export const MailPage = () =>
    <Grid container height='100vh' alignItems='center' justifyContent='center'>
        <Grid justifyContent='center' container sx={styles.mailboxContainer}>
            <MailBox/>
        </Grid>
        <DarkModeToggle/>
    </Grid>
