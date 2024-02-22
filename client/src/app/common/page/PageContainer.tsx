import { FC, ReactNode } from "react";

import BasePage from "./BasePage";

interface PageContainerProps {
    children: ReactNode
}

const PageContainer: FC<PageContainerProps> = ({ children }) =>
    <BasePage>
        { children }
    </BasePage>

export default PageContainer;