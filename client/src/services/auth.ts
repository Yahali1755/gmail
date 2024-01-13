import axios from "axios";

import { UserViewModel } from "@mail/common";

import { LoginData } from "../contexts/auth";

export const loginRequest = async (user: UserViewModel) => await axios.post<LoginData>("http://localhost:3000/auth/login", user)

export const registerRequest = async (user: UserViewModel) => await axios.post<LoginData>("http://localhost:3000/auth/register", user)

export const me = async (token: string) => 
    await axios.get<LoginData>("http://localhost:3000/auth/me", {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })