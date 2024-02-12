import MailBox from "./MailBox";
import SideBar from "./SideBar";
import PageContainer from "../common/PageContainer";
import { Route } from "../constants/Route";
import { RouteType } from "../shell/Routes";
import { useState } from "react";
import { MailboxType } from "../constants/MailboxType";

const Mail = () => {
    const [mailboxType, setMailboxType] = useState(MailboxType.Inbox)

    return (
        <PageContainer>
            <SideBar mailboxType={mailboxType} setMailBoxType={setMailboxType}/>
            <MailBox mailBoxType={mailboxType}/>
        </PageContainer>
    )
}

export default {
    path: Route.Mail,
    component: Mail
} as RouteType
