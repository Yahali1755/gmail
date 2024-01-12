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

export const verifyUser: RequestHandler = async ({body: { mail, password }}, res, next) => {
    const user = await UserModel.findOne({ mail });

    if(!user) {
        res.status(400).send("Mail address isn't found")
    }

    if (user && user.password !== password) {
        res.send(400).send("Wrong password")
    }

    next()
}

export const ensureMailUniqness: RequestHandler = async ({body: { mail }}, res, next) => {
    const existingUser = await UserModel.findOne({ mail });

    if (existingUser) {
        res.send(400).send("email address in use")
    }

    next()
}