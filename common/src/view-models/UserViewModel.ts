import { BaseViewModel } from "./BaseViewModel"

export interface UserViewModel extends BaseViewModel {
    email: string
    password: string
}