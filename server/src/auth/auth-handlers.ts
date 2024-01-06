import jwt from "jsonwebtoken"

import { RequestHandler } from "express";

export const generateToken: RequestHandler = (req, res, next) => {
    const token = jwt.sign(res.locals.user, process.env.TOKEN_SECRET_KEY, { expiresIn: process.env.TOKEN_EXPIRATION_TIME });

    res.locals.token = token;

    next()
}