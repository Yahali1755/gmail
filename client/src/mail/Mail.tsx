import { Grid } from "@mui/material";

import DarkModeToggle from "../theme/ToggleTheme"
import MailBox from "./MailBox";
import HomePageIconButton from "./SideBar/HomePageIconButton";
import SideBar from "./SideBar";

export const MailPage = () => {
    return (
        <Grid container minHeight='100vh' alignItems='center' justifyContent='center'>
            <SideBar/>
            <Grid item left="150px" justifyContent='center' height="800px" width='1200px' container>
                <MailBox/>
            </Grid>
            <DarkModeToggle/>
        </Grid>
    )
}
