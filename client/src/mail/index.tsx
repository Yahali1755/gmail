import { Grid } from "@mui/material";

import DarkModeToggle from "../theme/ToggleTheme"
import MailBox from "./MailBox";
import SideBar from "./SideBar";
import PageContainer from "../common/PageContainer";

const Mail = () => {
    return (
        <PageContainer>
            <SideBar/>
            <Grid item height="800px" width='1200px' container>
                <MailBox/>
            </Grid>
        </PageContainer>
    )
}

export default Mail;
