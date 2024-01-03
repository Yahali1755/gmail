import jwt from "jsonwebtoken"

import { UserViewModel } from "mail-common"

export const generateTokens = (user: UserViewModel) => {
    const accessToken = jwt.sign(user, process.env.TOKEN_SECRET_KEY, { expiresIn: process.env.TOKEN_EXPIRATION_TIME });
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET_KEY, { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION_TIME });


    return { accessToken, refreshToken}
}