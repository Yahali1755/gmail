import express from "express"
import { queries } from "../../common/queries";
import { MailModel } from "../../models/Mail";
import { MailMapper } from "./mail-mapper";
import { responses } from "../../common/responses";

const router = express.Router();
const mailMapper = new MailMapper()

router.get('/',
    queries.findEntities(MailModel),
    responses.sendEntities
)

router.get('/:id',
    queries.findEntityById(MailModel),
    responses.sendEntity
)

export default router;