import express from "express"

import { EmailQueryParameters, TypeName } from "@mail/common";

import { findPaginatedEntities } from "../../common/queries";
import { EmailDocument, EmailModel } from "../../models/Email";
import { sendEntity, sendPaginatedEntities } from "../../common/responses";
import { mapBodyToEntity } from "../../common/mapping";
import { insertEntity } from "../../common/updates";
import { prepareEmailForInsert } from "./handlers/insert-email-handlers";
import { convertEmailQueryParams } from "./handlers/find-email-handlers";
import { emailMapToModel, emailMapToViewModel } from "./EmailMapper";
import { Route } from "..";

const router = express.Router();

const insertEmail = insertEntity<EmailDocument>(EmailModel)
const findPaginatedEmails = findPaginatedEntities<EmailDocument, EmailQueryParameters>(EmailModel, convertEmailQueryParams)

router.post('/',
    mapBodyToEntity(emailMapToModel),
    prepareEmailForInsert,
    insertEmail,
    sendEntity(emailMapToViewModel)
)
router.get('/paginated',
    findPaginatedEmails,
    sendPaginatedEntities(emailMapToViewModel)
)

export default {
    router,
    path: `/${TypeName.Email}`
} as Route