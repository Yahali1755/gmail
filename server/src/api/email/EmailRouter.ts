import express from "express"

import { EmailQueryParameters, TypeName } from "@mail/common";

import { findPaginatedEntities } from "../../common/queries";
import { EmailDocument, EmailModel } from "../../models/Email";
import { EmailMapper } from "./EmailMapper";
import { sendEntity, sendPaginatedEntities } from "../../common/responses";
import { mapBodyToEntity } from "../../common/mapping";
import { insertEntity } from "../../common/updates";
import { prepareEmailForInsert } from "./handlers/insert-email-handlers";
import { convertEmailQueryParams } from "./handlers/find-email-handlers";
import { Route } from "../../config/express";

const router = express.Router();
const mapper = new EmailMapper()

const insertEmail = insertEntity<EmailDocument>(EmailModel)
const findPaginatedEmails = findPaginatedEntities<EmailDocument, EmailQueryParameters>(EmailModel, convertEmailQueryParams)

router.post('/',
    mapBodyToEntity(mapper),
    prepareEmailForInsert,
    insertEmail,
    sendEntity(mapper)
)
router.get('/paginated',
    findPaginatedEmails,
    sendPaginatedEntities(mapper)
)

export default {
    router,
    path: `/${TypeName.Email}`
} as Route