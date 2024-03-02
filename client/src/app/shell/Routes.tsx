import React, { FC } from 'react'
import { Route, Routes as RoutesComponent } from 'react-router-dom'

import LoginRoute from "../exterior/LoginPage"
import RegisterRoute from "../exterior/RegisterPage"
import InboxRoute from '../email/Inbox'
import OutboxRoute from '../email/Outbox'

export interface RouteType {
    path: string,
    component: FC
}

const routes: RouteType[] = [LoginRoute, RegisterRoute, InboxRoute, OutboxRoute]

const Routes: FC = () => 
    <RoutesComponent>
    {
        routes.map(route => 
            <Route Component={route.component} key={route.path} path={route.path} />
        )    
    }
    </RoutesComponent>

export default Routes