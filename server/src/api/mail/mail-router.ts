import express from "express"

import { findAllEntities, findEntityById } from "../../common/queries";
import { MailModel } from "../../models/mail";
import { MailMapper } from "./mail-mapper";
import { sendEntities, sendEntity } from "../../common/responses";

const router = express.Router();
const mailMapper = new MailMapper()

router.get('/',
    findAllEntities(MailModel),
    sendEntities
)

router.get('/:id',
    findEntityById(MailModel),
    sendEntity
)

export default {
    router,
    path: "/mail"
};