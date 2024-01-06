import axios from "axios";

import { UserViewModel } from "@mail/common";

import { LoginData } from "../contexts/auth";

export const loginRequest = (user: UserViewModel) => axios.post<LoginData>("/auth/login", user)

export const registerRequest = (user: UserViewModel) => axios.post<LoginData>("/auth/register", user)

export const me = (token: string) => 
    axios.get<LoginData>("/auth/me", {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    })