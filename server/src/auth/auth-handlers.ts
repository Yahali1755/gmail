import jwt from "jsonwebtoken"
import { RequestHandler } from "express";

import { AuthData, UserViewModel } from "@mail/common";

import { UserDocument, UserModel } from "../models/User";
import InvalidFieldError from "../errors/InvalidFieldError";
import { UserMapper } from "../api/user/UserMapper";

const mapper = new UserMapper();
type AuthRequestHandler = RequestHandler<{}, {}, UserViewModel, {}, {userDocument: UserDocument}>;

export const findUserByEmail: AuthRequestHandler = async ({body: {email, password}} , res, next) => {    
    const user = await UserModel.findOne({ email });

    res.locals.userDocument = user;

    next()
}

export const insertUser: AuthRequestHandler = async ({ body }, res, next) => {
    const userDocument = mapper.mapToModel(body)
    const newUser = await userDocument.save();

    const insertedUser = await UserModel.findById(newUser._id);

    res.locals.userDocument = insertedUser

    next()
}

export const verifyUser: AuthRequestHandler = async ({body: {email, password}}, {locals: {userDocument: user}}, next) => {
    if (!user) {
        next(new InvalidFieldError("Email address isn't found", {field: "email"}))
    }

    if (user && user.password !== password) {
        next(new InvalidFieldError("Wrong password", {field: "password"}))
    }

    next()
}

export const ensureEmailUniqueness: AuthRequestHandler = async ({ body: {email}}, res, next) => {
    const user = await UserModel.findOne({ email });
    
    if (user) {
        next(new InvalidFieldError("email address in use", {field: "email"}))
    }

    next()
}

const signToken = (email: string) => 
    jwt.sign({email}, process.env.TOKEN_SECRET_KEY, { expiresIn: process.env.TOKEN_EXPIRATION_TIME });


const authenticateUser = (userDocument: UserDocument): AuthData => {
    const { email } = mapper.mapToViewModel(userDocument)
    const token = signToken(email);

    return { token, email }
}

export const authenticate: AuthRequestHandler = (req, res) => {
    const { token, email } = authenticateUser(res.locals.userDocument)

    res.send({ token, email } as AuthData)
}

export const sendAuthData: RequestHandler<{}, {}, UserViewModel, {}, AuthData> = (req, res) => {
    res.send({ token: res.locals.token, email: res.locals.email} as AuthData)
}