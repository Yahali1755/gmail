import EmailBox from "./EmailBox";
import SideBar from "./SideBar";
import PageContainer from "../common/page/PageContainer";
import { Route } from "../constants/Route";
import { RouteType } from "../shell/Routes";
import { useState } from "react";
import { EmailBoxType } from "../constants/EmailboxType";
import AppBar from "./AppBar";

const Email = () => {
    const [emailBoxType, setEmailboxType] = useState(EmailBoxType.Inbox)

    return (
        <PageContainer>
            <AppBar/>
            <SideBar emailBoxType={emailBoxType} setEmailBoxType={setEmailboxType}/>
            <EmailBox emailBoxType={emailBoxType}/>
        </PageContainer>
    )
}

export default {
    path: Route.EmailBox,
    component: Email
} as RouteType
