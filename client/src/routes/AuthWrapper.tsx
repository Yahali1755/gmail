import React, { FC, ReactNode, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { Route } from '../constants/route';
import { useAuth } from '../contexts/auth';
import LoadingUserPage from '../exterior/LoadingUserPage';

interface AuthWrapperProps {
    children: ReactNode
}

const AuthWrapper: FC<AuthWrapperProps> = ({ children }) => {
    const navigate = useNavigate();
    const { token } = useAuth();
    const location = useLocation();

    useEffect(() => {
        if (token) {
            navigate(Route.Mail)
        } else {
            navigate(Route.User)
        }
    }, [])

    return location.pathname === Route.User ? (token ? <LoadingUserPage/> : <> { children }</>) : <> { children }</>
}

export default AuthWrapper