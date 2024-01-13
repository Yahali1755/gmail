import jwt from "jsonwebtoken"
import { RequestHandler } from "express";

import { UserViewModel } from "@mail/common";

import UnauthorizedError from "../errors/UnauthorizedError";

export const verifyToken: RequestHandler<{}, {}, {}, {}, {user: UserViewModel, token: string}> = (req, res, next) => {
    const token = req.header('Authorization');
  
    if (!token) {
      throw new UnauthorizedError("no token provided")
    }
  
    const tokenWithoutBearer = token.replace("Bearer ", "");

    jwt.verify(tokenWithoutBearer, process.env.TOKEN_SECRET_KEY, (error, decodedPayload) => {
      if (error) {
        throw new UnauthorizedError("invalid token")
      }

      res.locals.user = decodedPayload as UserViewModel;
      res.locals.token = tokenWithoutBearer;
    });

    next();
};