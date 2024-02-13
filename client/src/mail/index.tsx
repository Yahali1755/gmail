import { Box, Grid } from "@mui/material";

import MailBox from "./MailBox";
import SideBar from "./SideBar";
import PageContainer from "../common/page/PageContainer";
import { Route } from "../constants/Route";
import { RouteType } from "../shell/Routes";
import { useState } from "react";
import { MailboxType } from "../constants/MailboxType";
import AppBar from "./AppBar";

const Mail = () => {
    const [mailboxType, setMailboxType] = useState(MailboxType.Inbox)

    return (
        <PageContainer>
            <AppBar/>
            <SideBar mailboxType={mailboxType} setMailBoxType={setMailboxType}/>
            <MailBox mailBoxType={mailboxType}/>
        </PageContainer>
    )
}

export default {
    path: Route.Mail,
    component: Mail
} as RouteType
