import { EmailViewModel } from "@mail/common";

import { BaseMapper } from "../../common/BaseMapper";
import { EmailDocument, EmailModel } from "../../models/Email";

export class EmailMapper extends BaseMapper<EmailDocument, EmailViewModel> {
    constructor() {
        super(EmailModel)
    }

    public mapToViewModel = ({ _id, createdAt, author, recipients, isStarred, content, subject, isRead}: EmailDocument) => ({
        id: _id,
        createdAt,
        author,
        recipients,
        isStarred,
        content, 
        subject, 
        isRead
    })
}