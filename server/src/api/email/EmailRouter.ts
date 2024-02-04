import express from "express"

import { findEntities, findEntityById } from "../../common/queries";
import { EmailDocument, EmailModel } from "../../models/Email";
import { EmailMapper } from "./EmailMapper";
import { sendEntities, sendEntity, sendSuccess } from "../../common/responses";
import { mapBodyToEntity } from "../../common/mapping";
import { deleteEntity, insertEntity, updateEntity } from "../../common/updates";
import { prepareEmailForInsert } from "./email-handlers";

const router = express.Router();
const mapper = new EmailMapper()

const insertEmail = insertEntity<EmailDocument>(EmailModel)
const updateEmail = updateEntity<EmailDocument>(EmailModel)
const deleteEmail = deleteEntity<EmailDocument>()

router.get('/',
    findEntities(EmailModel),
    sendEntities(mapper)
)

router.post('/',
    mapBodyToEntity(mapper),
    prepareEmailForInsert,
    insertEmail,
    sendEntity(mapper)
)

router.put('/:id',
    mapBodyToEntity(mapper),
    updateEmail,
    sendEntity(mapper)
)

router.delete('/:id',
    findEntityById(EmailModel),
    deleteEmail,
    sendSuccess()
)

export default {
    router,
    path: "/email"
};