import { RequestHandler} from "express";

import { EmailDocument } from "../../../models/Email";

type PrepareEmailForInsertRequestHandler = RequestHandler<{}, {}, {}, {}, {entity: EmailDocument, email: string}>

export const prepareEmailForInsert: PrepareEmailForInsertRequestHandler = (req, res, next) => {
    res.locals.entity.author = res.locals.email;

    next()
}