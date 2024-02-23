import React, { FC } from 'react'
import { Route, Routes as RoutesComponent } from 'react-router-dom'

import UserRoute from "../user"
import EmailRoute from '../email'

export interface RouteType {
    path: string,
    component: FC
}

const routes: RouteType[] = [UserRoute, EmailRoute]

const Routes: FC = () => 
    <RoutesComponent>
    {
        routes.map(route => 
            <Route Component={route.component} key={route.path} path={route.path} />
        )    
    }
    </RoutesComponent>

export default Routes