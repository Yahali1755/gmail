import { Box, Grid } from "@mui/material";

import EmailBox from "./EmailBox";
import SideBar from "./SideBar";
import PageContainer from "../common/page/PageContainer";
import { Route } from "../constants/Route";
import { RouteType } from "../shell/Routes";
import { useState } from "react";
import { EmailBoxType } from "../constants/EmailboxType";
import Bar from "../Bar"

const Email = () => {
    const [emailBoxType, setEmailboxType] = useState(EmailBoxType.Inbox)

    return (
        <PageContainer>
            <Grid container height='100%' direction='column'>
                <Grid item>
                    <Bar/>
                </Grid>
                <Grid xs minHeight={0} item>
                    <Grid height="100%" container>
                        <Grid height="100%" item>
                            <SideBar setEmailBoxType={setEmailboxType} emailBoxType={emailBoxType}/>
                        </Grid>
                        <Grid xs height="100%" item>
                            <EmailBox emailBoxType={emailBoxType}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </PageContainer>
    )
}

export default {
    path: Route.EmailBox,
    component: Email
} as RouteType
