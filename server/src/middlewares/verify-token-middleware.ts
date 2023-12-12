import jwt from "jsonwebtoken"

const verifyToken = (req, res, next) => {
    if (req.path === '/user/login' || req.path === '/user/register') {
        next();

        return;
    }

    const token = req.header('Authorization');
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }
  
    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (error, decoded) => {
      if (error) {
        return res.status(401).json({ message: 'Unauthorized - Invalid token' });
      }
  
      req.user = decoded;
      next();
    });
};