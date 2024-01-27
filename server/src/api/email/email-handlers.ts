import { RequestHandler } from "express";
import { EmailDocument } from "../../models/email";
import { UserDocument } from "../../models/user";

type PrepareEmailForInsertRequestHandler = RequestHandler<{}, {}, {}, {}, {entity: EmailDocument, user: UserDocument}>

export const prepareEmailForInsert: PrepareEmailForInsertRequestHandler = (req, res, next) => {
    res.locals.entity.author = res.locals.user.email;

    next()
}