import jwt from "jsonwebtoken"

import { RequestHandler } from "express";
import { UserModel } from "../models/User";

export const generateToken: RequestHandler = (req, res, next) => {
    const token = jwt.sign(res.locals.entity, process.env.TOKEN_SECRET_KEY, { expiresIn: process.env.TOKEN_EXPIRATION_TIME });

    res.locals.token = token;

    next()
}

export const sendLoginData: RequestHandler = (req, res) => {
    res.send({ token: res.locals.token, user: res.locals.entity})
}

export const verifyUser: RequestHandler = async (req, res, next) => {
    const { mail, password } = req.body;

    const user = await UserModel.findOne({ mail });

    if(!user) {
        res.status(400).send("Mail address isn't found")
    }

    if (!user || user.password !== password) {
        res.send(400).send("Wrong password")
    }

    res.locals.entity = user;

    next()
}

export const ensureMailUniqness: RequestHandler = async (req, res, next) => {
    const { mail } = req.body;

    const existingUser = await UserModel.findOne({ mail });

    if (existingUser) {
        res.send(400).send("email address in use")
    }

    next()
}