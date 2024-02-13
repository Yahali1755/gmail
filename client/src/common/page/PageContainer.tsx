import { FC, ReactNode } from "react";

import BasePage from "./BasePage";
import AuthWrapper from "../../wrappers/AuthWrapper";

interface PageContainerProps {
    children: ReactNode
}

const PageContainer: FC<PageContainerProps> = ({ children }) =>
    <AuthWrapper>
        <BasePage>
            { children }
        </BasePage>
    </AuthWrapper>

export default PageContainer;