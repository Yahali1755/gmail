import React, { FC } from 'react'
import { Navigate, Route as RouteComponent, Routes } from 'react-router-dom'

import { RouteType } from '.'
import EmailRoute from '../email'
import { Route } from '../constants/Route'

const authenticatedRoutes: RouteType[] = [EmailRoute]

const AuthenticatedRoutes: FC = () => 
    <Routes>
        <>
        <RouteComponent path="/" element={<Navigate to={Route.EmailBox}/>}/>
        {
            authenticatedRoutes.map(route => 
                <RouteComponent Component={route.component} key={route.path} path={route.path} />
            )            
        }
        </>
    </Routes>


export default AuthenticatedRoutes