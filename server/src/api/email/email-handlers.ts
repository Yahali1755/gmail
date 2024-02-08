import { RequestHandler} from "express";

import { EmailQueryParameters } from "@mail/common";

import { EmailDocument } from "../../models/Email";
import { UserDocument } from "../../models/User";
import { ParseEmailQueryFiltersRequestHandler } from "../../common/queries";

type PrepareEmailForInsertRequestHandler = RequestHandler<{}, {}, {}, {}, {entity: EmailDocument, user: UserDocument}>

export const prepareEmailForInsert: PrepareEmailForInsertRequestHandler = (req, res, next) => {
    res.locals.entity.author = res.locals.user.email;

    next()
}

export const parseEmailQueryFilters = async (req, res, next) => {
    const { recipient = undefined, author = undefined} = req.query;
    let condition = {};

    if (recipient) {
        condition = {condition, 'recipients': recipient}
    }

    if (author) {
        condition = {...condition, ...{ author }}
    }

    res.locals.filters = condition;

    next();
}