import MailBox from "./MailBox";
import SideBar from "./SideBar";
import PageContainer from "../common/PageContainer";
import { Route } from "../constants/Route";
import { RouteType } from "../routes";
import { useState } from "react";
import { MailboxType } from "../constants/MailboxType";

const Mail = () => {
    const [mailboxType, setMailboxType] = useState(MailboxType.Inbox)

    return (
        <PageContainer>
            <MailBox mailBoxType={mailboxType}/>
            <SideBar mailboxType={mailboxType} setMailBoxType={setMailboxType}/>
        </PageContainer>
    )
}

export default {
    path: Route.Mail,
    component: Mail
} as RouteType
