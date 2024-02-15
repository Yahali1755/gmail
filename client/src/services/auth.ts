import axios from "axios";

import { LoginData } from "../contexts/auth";
import { UserFormData } from "../user/UserForm";

export const setToken = (token: string) => localStorage.setItem("token", token);

export const loginRequest = async (user: UserFormData) => await axios.post<LoginData>("/auth/login", user)

export const registerRequest = async (user: UserFormData) => await axios.post<LoginData>("/auth/register", user)

export const me = async (token: string) => 
    await axios.get<LoginData>("/auth/me", {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })