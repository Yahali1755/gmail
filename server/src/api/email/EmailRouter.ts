import express from "express"

import { TypeName } from "@mail/common";

import { findPaginatedEntities } from "../../common/queries";
import { EmailDocument, EmailModel } from "../../models/Email";
import { sendEntity, sendPaginatedEntities } from "../../common/responses";
import { mapBodyToEntity } from "../../common/mapping";
import { insertEntity } from "../../common/updates";
import { prepareEmailForInsert } from "./handlers/insert-email-handlers";
import { emailMapToModel, emailMapToViewModel } from "./EmailMapper";
import { Route } from "..";
import { addInboxFilter, addOutboxFilter } from "./handlers/find-email-handlers";

const router = express.Router();

const insertEmail = insertEntity<EmailDocument>(EmailModel)
const findPaginatedEmails = findPaginatedEntities<EmailDocument>(EmailModel)

router.post('/',
    mapBodyToEntity(emailMapToModel),
    prepareEmailForInsert,
    insertEmail,
    sendEntity(emailMapToViewModel)
)
router.get('/inbox',
    addInboxFilter,
    findPaginatedEmails,
    sendPaginatedEntities(emailMapToViewModel)
)

router.get('/outbox',
    addOutboxFilter,
    findPaginatedEmails,
    sendPaginatedEntities(emailMapToViewModel)
)

export default {
    router,
    path: `/${TypeName.Email}`
} as Route