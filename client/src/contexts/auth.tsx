import { ReactNode, FC, useState, createContext, useContext, useEffect } from "react"

import { UserViewModel } from "@mail/common"

import { CircularProgress, Typography, Grid, Button } from "@mui/material"
import { loginRequest, me, registerRequest } from "../services/auth"
import { useNavigate } from "react-router-dom"
import { Route } from "../constants/route"
import Dialog from "../common/Dialog"

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
    login: (user: UserViewModel) => void
    register: (user: UserViewModel) => void
}

const AuthContext = createContext({} as AuthContextProps)
export const useAuth = () => useContext(AuthContext);

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [loginData, setLoginData] = useState<LoginData>({} as LoginData)
    const [isLoading, setIsLoading] = useState(true)
    const [hasTokenExpired, setIsTokenExpired] = useState(false)
    const navigate = useNavigate()

    const isTokenExpired = (token: string) => {
        return false
    }

    const login = (user: UserViewModel) => {
        loginRequest(user).then(({ data }) => {
            setLoginData({token: data.token, user: data.user })
            setIsLoading(false)
        })
    }

    const register = (user: UserViewModel) => {
        registerRequest(user).then(({ data }) => {
            setLoginData({token: data.token, user: data.user })
            setIsLoading(false)
        })
    }

    useEffect(() => {
        if(token && !isTokenExpired(token)) {
            me(token).then(({ data }) => {
                setLoginData({token: data.token, user: data.user })
                setIsLoading(false)
                navigate(Route.Mail)
            }) 
        } else {
            setIsLoading(false)
            navigate(Route.Login)
        }
    }, [])

    const token = localStorage.getItem("token");

    return (
        <>
            {
                isLoading ?
                    <Grid container justifyContent='center' alignItems='center' direction='column'>
                        <Grid item>
                            <Typography>Loading User</Typography>
                        </Grid>
                        <Grid item>
                            <CircularProgress/>
                        </Grid>
                    </Grid> 
                :
                <AuthContext.Provider value={{...loginData, login, register}}>
                    <Dialog dialogActions={<Button onClick={() => location.reload()}> refresh </Button>} 
                        open={hasTokenExpired} onClose={() => location.reload()}>
                        <Typography>
                            Your login validity expired, refresh the page to continue
                        </Typography>
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