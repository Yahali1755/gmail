import express from "express"

import { findAllEntities, findEntityById } from "../../common/queries";
import { EmailModel } from "../../models/email";
import { EmailMapper } from "./email-mapper";
import { sendEntities, sendEntity } from "../../common/responses";

const router = express.Router();
const mailMapper = new EmailMapper()

router.get('/',
    findAllEntities(EmailModel),
    sendEntities
)

router.get('/:id',
    findEntityById(EmailModel),
    sendEntity
)

export default {
    router,
    path: "/email"
};