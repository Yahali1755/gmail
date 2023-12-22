import jwt from "jsonwebtoken"
import { NoTokenError } from "../errors/NoTokenError";
import { InvalidTokenError } from "../errors/InvalidTokenError";

export const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
  
    if (!token) {
      throw new NoTokenError()
    }
  
    const tokenWithoutBearer = token.split(" ")[1];

    jwt.verify(tokenWithoutBearer, process.env.TOKEN_SECRET_KEY, (error) => {
      if (error) {
        throw new InvalidTokenError();
      }
    });

    next();
};