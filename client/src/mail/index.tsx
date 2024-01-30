import { Grid, Theme, useTheme } from "@mui/material";

import MailBox from "./MailBox";
import SideBar from "./SideBar";
import PageContainer from "../common/PageContainer";
import { Route } from "../constants/Route";
import { RouteType } from "../routes";
import { useState } from "react";
import { MailboxCategory } from "../constants/MailboxCategory";
import useEmailQuery from "../query/use-email-query";

const getTableContainerStyles = (theme: Theme) => ({
    '&::-webkit-scrollbar': {
        width: '8px',
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.text.primary,
        borderRadius: '4px',
    },
    '&::-webkit-scrollbar-track': {
        backgroundColor: theme.palette.background.default,
        borderRadius: '4px',
    },
    boxShadow: theme.shadows[3]
})

const Mail = () => {
    const theme = useTheme()
    const [mailboxCategory, setMailboxCategory] = useState(MailboxCategory.Outbox)
    const emailQuery = useEmailQuery(mailboxCategory);

    return (
        <PageContainer>
            <SideBar setMailBoxCategory={setMailboxCategory}/>
            <Grid sx={getTableContainerStyles(theme)} item height="800px" width='1200px' overflow='auto' container>
                <MailBox emails={emailQuery.data.data} isLoading={emailQuery.isLoading} mailBoxCategory={mailboxCategory}/>
            </Grid>
        </PageContainer>
    )
}

export default {
    path: Route.Mail,
    component: Mail
} as RouteType
