import { FC, ReactNode } from "react";

import ThemeToggler from "../theme/ToggleTheme";
import BasePage from "../exterior/BasePage";
import AuthWrapper from "./AuthWrapper";

interface PageContainerProps {
    children: ReactNode
}

const PageContainer: FC<PageContainerProps> = ({ children }) =>
    <AuthWrapper>
        <BasePage>
            { children }
            <ThemeToggler/>
        </BasePage>
    </AuthWrapper>

export default PageContainer;