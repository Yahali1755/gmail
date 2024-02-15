import { ReactNode, FC, useState, createContext, useContext, useEffect } from "react"
import { Button, DialogActions, DialogContent, Typography } from "@mui/material"

import { UserViewModel } from "@mail/common"

import { loginRequest, me, registerRequest, setToken } from "../services/auth"
import LoadingPage from "../common/page/LoadingPage"
import Dialog from "../common/dialog"
import { Route } from "../constants/Route"
import BasePage from "../common/page/BasePage"

interface AuthProviderProps {
    children: ReactNode
}

export interface LoginData {
    token: string,
    user: UserViewModel
}

interface AuthContextProps {
    token: string,
    user: UserViewModel
    login: (user: UserViewModel) => Promise<void>
    register: (user: UserViewModel) => Promise<void>
    logout: () => void
}

const AuthContext = createContext({} as AuthContextProps)

export const useAuth = () => useContext(AuthContext);

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [loginData, setLoginData] = useState<LoginData>({} as LoginData)
    const [isLoading, setIsLoading] = useState(true)
    const [hasTokenExpired, setHasTokenExpired] = useState(false)
    const TOKEN_EXPIRATION_INTERVAL = 30000

    const logout = () => {
        localStorage.removeItem("token")

        setLoginData(null);
    }

    const isTokenExpired = (token: string) => {
        const payload = token.split(".")[1];
        const decodedPayload = JSON.parse(atob(payload))
        
        return Date.now() > decodedPayload.exp * 1000
    }

    useEffect(() => {
        const tokenExpirationInterval = setInterval(() => {
            const token = localStorage.getItem("token");

            if (token && isTokenExpired(token)) {
                setHasTokenExpired(true);
                logout();
            }
        }, TOKEN_EXPIRATION_INTERVAL)

        return () => clearInterval(tokenExpirationInterval)
    }, [])

    const login = (user: UserViewModel) => 
        loginRequest(user).then(({ data: {token, user} }) => {
            setLoginData({token, user })
            setToken(token)
        })
    

    const register = (user: UserViewModel) => 
        registerRequest(user).then(({ data: {token, user} }) => {
            setLoginData({token, user })
            setToken(token)
        })
    
    useEffect(() => {
        const token = localStorage.getItem("token");

        if(token && !isTokenExpired(token)) {
            me(token).then(({ data }) => {
                setLoginData(data)
                setHasTokenExpired(false);
            }).finally(() => {
                setIsLoading(false)
            })
        } else {
            setIsLoading(false)
        }
    }, [])

    return (
        <>
            {
                isLoading ?
                    <BasePage>
                        <LoadingPage title="Loading User"/>
                    </BasePage>
                :
                <AuthContext.Provider value={{...loginData, login, register, logout}}>
                    <Dialog open={hasTokenExpired} onClose={() => location.href = Route.User}>
                        <DialogContent>
                            <Typography>
                                Your authentication validity expired, refresh the page to continue
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => location.href = Route.User}> refresh </Button>
                        </DialogActions>
                    </Dialog>
                    {
                        children
                    }
                </AuthContext.Provider>
            }
        </>
    )
}

export default AuthProvider;