import React, { FC, ReactNode, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { Route } from '../../constants/Route';
import { useAuth } from '../../contexts/auth';
import LoadingPage from '../page/LoadingPage';

interface AuthWrapperProps {
    children: ReactNode
}

const AuthWrapper: FC<AuthWrapperProps> = ({ children }) => {
    const navigate = useNavigate();
    const { token } = useAuth();
    const location = useLocation();

    useEffect(() => {
        if (token) {
            navigate(Route.EmailBox)
        } else {
            navigate(Route.User)
        }
    }, [token])

    return location.pathname === Route.User ? 
        (   
            token ?
                <LoadingPage title="Loading User"/>
            : 
            <> { children } </>
        ) 
        : 
        <> { children } </>
}

export default AuthWrapper