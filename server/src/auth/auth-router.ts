import express from "express"

import { UserModel } from "../models/user";
import { ensureMailUniqness, generateToken, sendLoginData, verifyUser } from "./auth-handlers";
import { insertEntity } from "../common/updates";

const router = express.Router();

router.post('/login',
    verifyUser,
    generateToken,
    sendLoginData
);

router.post('/register',
    ensureMailUniqness,
    insertEntity(UserModel),
    generateToken,
    sendLoginData
);

export default router;