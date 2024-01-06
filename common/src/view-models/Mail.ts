export interface MailViewModel {
    author: string
    recipients: string[],
    subject: string
    content: string
    uploadedAt: Date
    isRead: boolean
    isStarred: boolean
}