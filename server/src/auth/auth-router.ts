import express from "express"

import { UserModel } from "../models/User";
import { ensureMailUniqness, generateToken, sendLoginData, verifyUser } from "./auth-handlers";
import { updates } from "../common/updates";

const router = express.Router();

router.post('/login',
    verifyUser,
    generateToken,
    sendLoginData
);

router.post('/register',
    ensureMailUniqness,
    updates.insertEntity(UserModel),
    generateToken,
    sendLoginData
);

export default router;