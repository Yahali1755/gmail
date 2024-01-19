import { Grid, Theme, useTheme } from "@mui/material";

import MailBox from "./MailBox";
import SideBar from "./SideBar";
import PageContainer from "../common/PageContainer";
import { Route } from "../constants/route";
import { RouteType } from "../routes";

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

    return (
        <PageContainer>
            <SideBar/>
            <Grid sx={getTableContainerStyles(theme)} item height="800px" width='1200px' overflow='auto' container>
                <MailBox/>
            </Grid>
        </PageContainer>
    )
}

export default {
    path: Route.Mail,
    component: Mail
} as RouteType
