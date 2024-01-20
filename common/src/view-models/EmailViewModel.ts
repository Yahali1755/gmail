import { BaseViewModel } from "./BaseViewModel"

export interface EmailViewModel extends BaseViewModel {
    author: string
    recipients: string[],
    subject: string
    content: string
    createdAt: Date
    isRead: boolean
    isStarred: boolean
}