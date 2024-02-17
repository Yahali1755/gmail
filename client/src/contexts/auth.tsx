import { ReactNode, FC, useState, createContext, useContext, useEffect } from "react"
import { Button, DialogActions, DialogContent, Typography } from "@mui/material"

import { AuthData } from "@mail/common"

import { loginRequest, me, registerRequest, setToken } from "../services/auth"
import LoadingPage from "../common/page/LoadingPage"
import Dialog from "../common/dialog"
import { Route } from "../constants/Route"
import BasePage from "../common/page/BasePage"
import { UserFormData } from "../user/UserForm"
import { AxiosResponse } from "axios"

interface AuthProviderProps {
    children: ReactNode
}

interface AuthContextProps {
    token: string
    email: string
    login: (user: UserFormData) => Promise<void>
    register: (user: UserFormData) => Promise<void>
    logout: () => void
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export const useAuth = () => useContext(AuthContext);

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [authData, setAuthData] = useState<AuthData>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [hasTokenExpired, setHasTokenExpired] = useState(false)
    const TOKEN_EXPIRATION_CHECK_INTERVAL = 30000

    const logout = () => {
        localStorage.removeItem("token")

        setAuthData(null);
        setHasTokenExpired(false);
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
            }
        }, TOKEN_EXPIRATION_CHECK_INTERVAL)

        return () => clearInterval(tokenExpirationInterval)
    }, [])

    const handleAuthResponse = ({data: {token, email}}: AxiosResponse<AuthData>) => {
        setAuthData({ token, email })
        setToken(token)
        setHasTokenExpired(false)
    }

    const login = (user: UserFormData) => loginRequest(user).then(handleAuthResponse)

    const register = (user: UserFormData) => registerRequest(user).then(handleAuthResponse)
    
    useEffect(() => {
        const token = localStorage.getItem("token");

        if(token && !isTokenExpired(token)) {
            me(token).then(({ data }) => {
                setAuthData(data)
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
                <AuthContext.Provider value={{...authData, login, register, logout}}>
                    <Dialog open={hasTokenExpired} onClose={logout}>
                        <DialogContent>
                            <Typography>
                                Your authentication validity expired, refresh the page to continue
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={logout}> refresh </Button>
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