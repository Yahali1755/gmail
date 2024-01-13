import express from "express"

import { UserModel } from "../models/user";
import { ensureEmailUniqness, generateToken, sendLoginData, verifyUser } from "./auth-handlers";
import { insertEntity } from "../common/updates";
import { verifyToken } from "../middlewares/verify-token-middleware";

const router = express.Router();

router.post('/login',
    verifyUser,
    generateToken,
    sendLoginData
);

router.post('/me',
    verifyToken,
    sendLoginData
);

router.post('/register',
    ensureEmailUniqness,
    insertEntity(UserModel),
    generateToken,
    sendLoginData
);

export default router;