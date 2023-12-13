import jwt from "jsonwebtoken"
import { logger } from "../utils/logger";

export const verifyToken = (req, res, next) => {
    if (req.path === '/user/login' || req.path === '/user/register') {
        next();

        return;
    }

    const token = req.header('Authorization');
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }
  
    const tokenWithoutBearer = token.split(" ")[1];

    jwt.verify(tokenWithoutBearer, process.env.TOKEN_SECRET_KEY, (error, decoded) => {
      console.log(error)
      if (error) {
        return res.status(401).json({ message: 'Unauthorized - Invalid token' });
      }
  
      req.user = decoded;

      next();
    });
};