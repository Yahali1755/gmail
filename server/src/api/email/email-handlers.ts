import { RequestHandler} from "express";

import { EmailDocument } from "../../models/Email";
import { UserDocument } from "../../models/User";

type PrepareEmailForInsertRequestHandler = RequestHandler<{}, {}, {}, {}, {entity: EmailDocument, user: UserDocument}>

export const prepareEmailForInsert: PrepareEmailForInsertRequestHandler = (req, res, next) => {
    res.locals.entity.author = res.locals.user.email;

    next()
}

export const convertEmailQueryParams =  <TQueryParameters extends Record<string, any>>(parameters: TQueryParameters) => {
    const { recipient = undefined, author = undefined} = parameters;
    let condition = {};

    if (recipient) {
        condition = {condition, 'recipients': recipient}
    }

    if (author) {
        condition = {...condition, ...{ author }}
    }

    return condition
}