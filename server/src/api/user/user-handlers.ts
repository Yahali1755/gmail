import { RequestHandler } from "express";
import { UserDocument, UserModel } from "../../models/User";

export const changeTheme: RequestHandler<{}, {}, {}, {}, {entity: UserDocument}> = async (req, {locals: { entity }}, next) => {
    const user = entity;

    await UserModel.updateOne(user._id, {theme: {isDarkTheme: user.theme.isDarkTheme}})

    next()
}