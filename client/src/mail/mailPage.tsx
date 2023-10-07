import { Grid } from "@mui/material";

import DarkModeToggle from "../theme/toggleTheme"
import MailBox from "./mail-box";
import Navbar from "./navbar";
import { useOpen } from "../common/form/use-open";

export const MailPage = () => {
    return (
        <Grid container height='100vh' alignItems='center' justifyContent='center'>
            <Navbar/>
            <Grid sx={{overflow: "hidden"}} left="150px" position="relative" justifyContent='center' height="85vh" width='70vw' container>
                <MailBox/>
            </Grid>
            <DarkModeToggle/>
        </Grid>
    )
}
