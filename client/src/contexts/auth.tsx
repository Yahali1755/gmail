import { ReactNode, FC, useState, createContext, useContext, useEffect } from "react"

import { UserViewModel } from "@mail/common"

import { loginRequest, me, registerRequest, setToken } from "../services/auth"
import LoadingUserPage from "../exterior/LoadingUserPage"

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
}

const AuthContext = createContext({} as AuthContextProps)
export const useAuth = () => useContext(AuthContext);

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [loginData, setLoginData] = useState<LoginData>({} as LoginData)
    const [isLoading, setIsLoading] = useState(true)
    const [hasTokenExpired, setIsTokenExpired] = useState(false)

    const isTokenExpired = (token: string) => {
        return false
    }

    const login = (user: UserViewModel) => 
        loginRequest(user).then(({ data: {token, user} }) => {
            setLoginData({token: token, user: user })
            setToken(token)
        })
    

    const register = (user: UserViewModel) => 
        registerRequest(user).then(({ data: {token, user} }) => {
            setLoginData({token: token, user: user })
            setToken(token)
        })
    

    useEffect(() => {
        const token = localStorage.getItem("token");

        if(token && !isTokenExpired(token)) {
            me(token).then(({ data }) => {
                setLoginData({token: data.token, user: data.user })
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
                    <LoadingUserPage/>
                :
                <AuthContext.Provider value={{...loginData, login, register}}>
                    {/* <Dialog dialogActions={<Button onClick={() => location.reload()}> refresh </Button>} 
                        open={hasTokenExpired} onClose={() => location.reload()}>
                        <Typography>
                            Your login validity expired, refresh the page to continue
                        </Typography>
                    </Dialog> */}
                    {
                        children
                    }
                </AuthContext.Provider>
            }

        </>
    )
}

export default AuthProvider;