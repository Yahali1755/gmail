import React, { FC } from 'react'
import { Route, Routes as RoutesComponent } from 'react-router-dom'

import LoginRoute from "../exterior/LoginPage"
import RegisterRoute from "../exterior/RegisterPage"
import EmailRoute from '../email'

export interface RouteType {
    path: string,
    component: FC
}

const routes: RouteType[] = [LoginRoute, EmailRoute, RegisterRoute]

const Routes: FC = () => 
    <RoutesComponent>
    {
        routes.map(route => 
            <Route Component={route.component} key={route.path} path={route.path} />
        )    
    }
    </RoutesComponent>

export default Routes