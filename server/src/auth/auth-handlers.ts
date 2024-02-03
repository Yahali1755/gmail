import jwt from "jsonwebtoken"

import { UserViewModel } from "@mail/common";

import { RequestHandler } from "express";
import { UserModel } from "../models/User";

export const generateToken: RequestHandler<{}, {}, UserViewModel, {}, {token: string, user: UserViewModel}> = ({ body }, res, next) => {
    const token = jwt.sign(body, process.env.TOKEN_SECRET_KEY, { expiresIn: process.env.TOKEN_EXPIRATION_TIME });

    res.locals.token = token;
    res.locals.user = body;

    next()
}

export const sendLoginData: RequestHandler<{}, {}, {}, {}, {user: UserViewModel, token: string}> = (req, res) => {
    res.send({ token: res.locals.token, user: res.locals.user})
}

export const verifyUser: RequestHandler<{}, {}, UserViewModel, {}, {}> = async ({ body }, res, next) => {
    const { email, password } = body
    const user = await UserModel.findOne({ email });

    if(!user) {
        res.status(400).send({field: "email", message: "Email address isn't found"})

        return;
    }

    if (user && user.password !== password) {
        res.status(400).send({field: "password", message: "Wrong password"})

        return;
    }

    next()
}

export const ensureEmailUniqness: RequestHandler<{}, {}, UserViewModel, {}, {}> = async ({body: { email }}, res, next) => {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
        res.status(400).send({field: "email", message: "email address in use"})

        return;
    }

    next()
}