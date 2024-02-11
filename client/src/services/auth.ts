import axios from "axios";

import { UserViewModel } from "@mail/common";

import { LoginData } from "../contexts/auth";

export const setToken = (token: string) => localStorage.setItem("token", token);

export const loginRequest = async (user: UserViewModel) => await axios.post<LoginData>("/auth/login", user)

export const registerRequest = async (user: UserViewModel) => await axios.post<LoginData>("/auth/register", user)

export const me = async (token: string) => 
    await axios.get<LoginData>("/auth/me", {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })