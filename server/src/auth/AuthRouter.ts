import express from "express"

import { UserModel } from "../models/User";
import { ensureEmailUniqness, generateToken, sendLoginData, verifyUser } from "./auth-handlers";
import { insertEntity } from "../common/updates";
import { verifyToken } from "../middlewares/verify-token-middleware";
import { mapBodyToEntity } from "../common/mapping";
import { UserMapper } from "../api/user/UserMapper";

const router = express.Router();
const mapper = new UserMapper();

const insertUser = insertEntity(UserModel);

router.post('/login',
    verifyUser,
    generateToken,
    sendLoginData
);

router.get('/me',
    verifyToken,
    sendLoginData
);

router.post('/register',
    ensureEmailUniqness,
    mapBodyToEntity(mapper),
    insertUser,
    generateToken,
    sendLoginData
);

export default router;