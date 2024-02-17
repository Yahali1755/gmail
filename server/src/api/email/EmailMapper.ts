import { EmailViewModel } from "@mail/common";

import { MapToViewModelFunction, baseMapToModel } from "../../common/BaseMapper";
import { EmailDocument, EmailModel } from "../../models/Email";

export const emailMapToModel = baseMapToModel(EmailModel);

export const emailMapToViewModel: MapToViewModelFunction<EmailDocument, EmailViewModel> = ({ _id, createdAt, author, recipients, content, subject}: EmailDocument) => ({
    id: _id,
    createdAt,
    author,
    recipients,
    content, 
    subject
})