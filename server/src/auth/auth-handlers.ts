import jwt from "jsonwebtoken"

import { RequestHandler } from "express";
import { UserModel } from "../models/user";

import { UserViewModel } from "@mail/common";

export const generateToken: RequestHandler<{}, {}, {}, {}, {token: string, entity: string}> = (req, res, next) => {
    const token = jwt.sign(res.locals.entity, process.env.TOKEN_SECRET_KEY, { expiresIn: process.env.TOKEN_EXPIRATION_TIME });

    res.locals.token = token;

    next()
}

export const sendLoginData: RequestHandler<{}, {}, {}, {}, {user: UserViewModel, token: string}> = (req, res) => {
    res.send({ token: res.locals.token, user: res.locals.user})
}

export const verifyUser: RequestHandler = async ({body: { email, password }}, res, next) => {
    const user = await UserModel.findOne({ email });

    if(!user) {
        console.log("Email address isn't found")

        res.status(400).send("Email address isn't found")

        return;
    }

    if (user && user.password !== password) {
        console.log("Wrong password")

        res.send(400).send("Wrong password")

        return;
    }

    console.log(user)

    next()
}

export const ensureEmailUniqness: RequestHandler = async ({body: { email }}, res, next) => {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
        res.send(400).send("email address in use")
    }

    next()
}