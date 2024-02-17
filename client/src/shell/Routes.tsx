import React, { FC } from 'react'
import { Route as RouteComponent, Routes as RoutesComponent } from 'react-router-dom'

import UserRoute from "../user"
import EmailRoute from "../email"

export interface RouteType {
    path: string,
    component: FC
}

const routes: RouteType[] = [UserRoute, EmailRoute]

const Routes = () => 
    <RoutesComponent>
    {
        routes.map(route => 
            <RouteComponent Component={route.component} key={route.path} path={route.path} />
        )
    }
    </RoutesComponent>

export default Routes