import React, { FC, ReactNode } from 'react'
import { BrowserRouter } from "react-router-dom";

import Routes from "./Routes"
import AuthWrapper from '../common/wrappers/AuthWrapper';
 
const Shell: FC = () =>
    <BrowserRouter>
        <AuthWrapper>
            <Routes/>
        </AuthWrapper>
    </BrowserRouter>


export default Shell