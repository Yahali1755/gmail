import jwt, { JwtPayload} from "jsonwebtoken"
import { RequestHandler } from "express";

import { AuthData, UserViewModel } from "@mail/common";

import UnauthorizedError from "../errors/UnauthorizedError";

export const verifyToken: RequestHandler<{}, {}, UserViewModel, {}, AuthData> = (req, res, next) => {
    const token = req.header('Authorization');
  
    if (!token) {
      return next(new UnauthorizedError("no token provided"))
    }
  
    const tokenWithoutBearer = token.replace("Bearer ", "");

    jwt.verify(tokenWithoutBearer, process.env.TOKEN_SECRET_KEY, (error, decodedPayload) => {
      if (error) {
        return next(new UnauthorizedError("invalid token"))
      }

      const { email } = decodedPayload as JwtPayload;

      res.locals.email = email;
      res.locals.token = tokenWithoutBearer;
    });

    next();
};