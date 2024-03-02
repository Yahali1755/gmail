import { EmailDocument } from "../../../models/Email";
import { FindPaginatedEntitiesRequestHandler } from "../../../common/queries";

export const addInboxFilter: FindPaginatedEntitiesRequestHandler<EmailDocument> = (req, res, next) => {
    res.locals.filters = {recipients: res.locals.email}

    next()
}

export const addOutboxFilter: FindPaginatedEntitiesRequestHandler<EmailDocument> = (req, res, next) => {
    res.locals.filters = {author: res.locals.email}

    next()
}
