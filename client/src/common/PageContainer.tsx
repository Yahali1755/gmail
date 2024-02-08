import { FC, ReactNode } from "react";

import DarkModeToggle from "../theme/ToggleTheme";
import AuthWrapper from "../routes/AuthWrapper";
import BasePage from "../exterior/BasePage";

interface PageContainerProps {
    children: ReactNode
}

const PageContainer: FC<PageContainerProps> = ({ children }) =>
    <AuthWrapper>
        <BasePage>
            { children }
            <DarkModeToggle/>
        </BasePage>
    </AuthWrapper>

export default PageContainer;