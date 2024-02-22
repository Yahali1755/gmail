import React, { FC } from 'react'
import { BrowserRouter } from "react-router-dom";

import ExternalRoutes from "./ExternalRoutes"
import { useAuth } from '../contexts/auth';
import AuthenticatedRoutes from './AuthenticatedRoutes';

export interface RouteType {
    path: string,
    component: FC
}
 
const Shell: FC = () => {
    const { token } = useAuth();

    return (
        <BrowserRouter>
        {
            token ? <AuthenticatedRoutes/> : <ExternalRoutes/>
        }
        </BrowserRouter>
    )
}

export default Shell