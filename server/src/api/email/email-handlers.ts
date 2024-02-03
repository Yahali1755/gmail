import { RequestHandler, Response } from "express";
import { EmailDocument } from "../../models/Email";
import { UserDocument } from "../../models/User";

type PrepareEmailForInsertRequestHandler = RequestHandler<{}, {}, {}, {}, {entity: EmailDocument, user: UserDocument}>

export const prepareEmailForInsert: PrepareEmailForInsertRequestHandler = (req, res, next) => {
    res.locals.entity.author = res.locals.user.email;

    next()
}