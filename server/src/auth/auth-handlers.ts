import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";
import { RequestHandler } from "express";

import { AuthData, UserViewModel } from "@mail/common";

import { UserDocument, UserModel } from "../models/User";
import BadRequestError from "../errors/BadRequestError";
import { userMapToViewModel } from "../api/user/UserMapper";
import { hash } from "../utils/hash";

type AuthRequestHandler = RequestHandler<{}, {}, UserViewModel, {}, {entity: UserDocument}>;

export const ensureEmailUniqueness: AuthRequestHandler = async (req, { locals: {entity: { email }}}, next) => {    
    const user = await UserModel.findOne({ email });

    if (user) {
        next(new BadRequestError("email address in use", {field: "email"}))
    }
}

export const hashPassword: AuthRequestHandler = async (req, res, next) => {
    const { locals: { entity: { password }}} = res

    const hashedPassword = await hash(password)

    res.locals.entity.password = hashedPassword;

    next() 
}

export const beforeInsertUser: AuthRequestHandler = async (req, res, next) => {
    ensureEmailUniqueness(req, res, next),
    hashPassword(req, res, next)
}

export const findUserByEmail: AuthRequestHandler = async ({body: {email, password}} , res, next) => {    
    const user = await UserModel.findOne({ email });

    res.locals.entity = user;

    next()
}

export const verifyUser: AuthRequestHandler = async ({body: {email, password}}, {locals: {entity: user}}, next) => {
    if (!user) {
        next(new BadRequestError("Email address isn't found", {field: "email"}))
    }

    if (user) {
        const arePasswordsEqual = await bcrypt.compare(password, user.password);

        if (!arePasswordsEqual) {
            next(new BadRequestError("Wrong password", {field: "password"}))
        }
    }

    next()
}

const signToken = (email: string) => jwt.sign({email}, process.env.TOKEN_SECRET_KEY, { expiresIn: process.env.TOKEN_EXPIRATION_TIME });

const authenticateUser = (userDocument: UserDocument): AuthData => {
    const { email } = userMapToViewModel(userDocument)
    const token = signToken(email);

    return { token, email }
}

export const authenticate: AuthRequestHandler = (req, res) => {
    const { token, email } = authenticateUser(res.locals.entity)

    res.send({ token, email } as AuthData)
}

export const sendAuthData: RequestHandler<{}, {}, UserViewModel, {}, AuthData> = (req, res) => {
    res.send({ token: res.locals.token, email: res.locals.email} as AuthData)
}