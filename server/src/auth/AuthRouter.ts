import express from "express"

import { ensureEmailUniqueness, findUserByEmail, insertUser, authenticate, verifyUser, me } from "./auth-handlers";
import { verifyToken } from "../middlewares/verify-token-middleware";

const router = express.Router();

router.post('/login',
    findUserByEmail,
    verifyUser,
    authenticate
);

router.get('/me',
    verifyToken,
    me
);

router.post('/register',
    ensureEmailUniqueness,
    insertUser,
    authenticate
);

export default router;