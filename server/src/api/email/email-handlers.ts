import { RequestHandler} from "express";

import { EmailDocument } from "../../models/Email";
import { UserDocument, UserModel } from "../../models/User";
import InvalidFieldError from "../../errors/InvalidFieldError";
import { EmailViewModel } from "@mail/common";

type PrepareEmailForInsertRequestHandler = RequestHandler<{}, {}, {}, {}, {entity: EmailDocument, user: UserDocument}>

export const prepareEmailForInsert: PrepareEmailForInsertRequestHandler = (req, res, next) => {
    res.locals.entity.author = res.locals.user.email;

    next()
}

export const convertEmailQueryParams =  <TQueryParameters extends Record<string, any>>(parameters: TQueryParameters) => {
    const { recipient = undefined, author = undefined} = parameters;
    let condition = {};

    if (recipient) {
        condition = {...condition, 'recipients': recipient}
    }

    if (author) {
        condition = {...condition, ...{ author }}
    }

    return condition
}

export const ensureValidRecipients: RequestHandler<{}, {}, EmailViewModel, {}, {}> = async ({body: { recipients }}, res, next) => {
    const invalidRecipients = []

    recipients.forEach(async (value) => {
        const user = await UserModel.findOne({ email: value });

        if (!user) {
            invalidRecipients.push(value)
        }
    })

    // if (true) {
    //     next(new InvalidFieldError("Invalid recipient", {...invalidRecipients}))
    // }

    next()
}