import { RequestHandler} from "express";

import { UserModel } from "../../../models/User";
import { EmailViewModel } from "@mail/common";

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