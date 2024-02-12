import jwt from "jsonwebtoken"
import { RequestHandler } from "express";

import { UserViewModel } from "@mail/common";

import { UserDocument, UserModel } from "../models/User";
import InvalidFieldError from "../errors/InvalidFieldError";


export const generateToken: RequestHandler<{}, {}, UserViewModel, {}, {token: string, user: UserViewModel}> = ({ body }, res, next) => {
    const token = jwt.sign(body, process.env.TOKEN_SECRET_KEY, { expiresIn: process.env.TOKEN_EXPIRATION_TIME });

    res.locals.user = body;
    res.locals.token = token;

    next()
}

export const sendLoginData: RequestHandler<{}, {}, {}, {}, {user: UserViewModel, token: string}> = (req, res) => {
    res.send({ token: res.locals.token, user: res.locals.user})
}

export const verifyUser: RequestHandler<{}, {}, UserViewModel, {}, {}> = async ({body: {email, password}} , res, next) => {
    const user = await UserModel.findOne({ email });

    if(!user) {
        next(new InvalidFieldError("Email address isn't found", {field: "email"}))
    }

    if (user && user.password !== password) {
        next(new InvalidFieldError("Wrong password", {field: "password"}))
    }

    next()
}

export const ensureEmailUniqness: RequestHandler<{}, {}, UserViewModel, {}, {}> = async ({body: { email }}, res, next) => {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
        next(new InvalidFieldError("email address in use", {field: "email"}))
    }

    next()
}