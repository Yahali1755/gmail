import { Grid } from "@mui/material";

import SideBar from "./SideBar";
import PageContainer from "../common/page/PageContainer";
import { FC, ReactNode } from "react";
import Bar from "./Bar"

interface EmailPageProps {
    children: ReactNode
}

const EmailPage: FC<EmailPageProps> = ({ children }) => 
    <PageContainer>
        <Grid container height='100%' flexDirection='column'>
            <Grid width="100%" item>
                <Bar/>
            </Grid>
            <Grid xs overflow='auto' item>
                <Grid height="100%" container>
                    <Grid height="100%" item>
                        <SideBar/>
                    </Grid>
                    <Grid xs height="100%" item>
                        { children }
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </PageContainer>

export default EmailPage
