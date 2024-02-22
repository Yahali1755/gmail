import React from 'react'
import { Route as RouteComponent, Routes, Navigate } from 'react-router-dom'

import UserRoute from "../user"
import { RouteType } from '.'
import { Route } from '../constants/Route'

const externalRoutes: RouteType[] = [UserRoute]

const ExternalRoutes = () => 
    <Routes>
        <>
        <RouteComponent path="/" element={<Navigate to={Route.User}/>}/>
        {
            externalRoutes.map(route => 
                <RouteComponent Component={route.component} key={route.path} path={route.path} />
            )            
        }
        </>
    </Routes>

export default ExternalRoutes