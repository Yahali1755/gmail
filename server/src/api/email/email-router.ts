import express from "express"

import { findAllEntities, findEntityById } from "../../common/queries";
import { EmailDocument, EmailModel } from "../../models/email";
import { EmailMapper } from "./email-mapper";
import { sendEntities, sendEntity, sendSuccess } from "../../common/responses";
import { mapBodyToEntity } from "../../common/mapping";
import { deleteEntity, insertEntity, updateEntity } from "../../common/updates";

const router = express.Router();
const mapper = new EmailMapper()

const insertEmail = insertEntity<EmailDocument>(EmailModel)
const updateEmail = updateEntity<EmailDocument>(EmailModel)
const deleteEmail = deleteEntity<EmailDocument>()

router.get('/',
    findAllEntities(EmailModel),
    sendEntities
)

router.post('/',
    mapBodyToEntity(mapper),
    insertEmail,
    sendEntity
)

router.post('/:id',
    mapBodyToEntity(mapper),
    updateEmail,
    sendEntity
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