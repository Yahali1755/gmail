import jwt from "jsonwebtoken"
import { RequestHandler } from "express";

import { UserViewModel } from "@mail/common";

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
    if(!user) {
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

const signToken = (user: UserViewModel) => 
    jwt.sign(user, process.env.TOKEN_SECRET_KEY, { expiresIn: process.env.TOKEN_EXPIRATION_TIME });

const authenticateUser = async (userDocument: UserDocument) => {
    const user = mapper.mapToViewModel(userDocument)
    const token = signToken(user);

    return { token, user } 
}

export const authenticate: AuthRequestHandler = async (req, res) => {
    const { token, user } = await authenticateUser(res.locals.userDocument)

    res.send({ token, user})
}

export const me: RequestHandler<{}, {}, UserViewModel, {}, {user: UserViewModel, token: string}> = async (req, res) => {
    res.send({ token: res.locals.token, user: res.locals.user})
}