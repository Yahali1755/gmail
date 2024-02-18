import express from "express"

import { ensureEmailUniqueness, findUserByEmail, authenticate, verifyUser, sendAuthData, beforeInsertUser } from "./auth-handlers";
import { verifyToken } from "../middlewares/verify-token-middleware";
import { UserDocument, UserModel } from "../models/User";
import { insertEntity } from "../common/updates";
import { mapBodyToEntity } from "../common/mapping";
import { userMapToModel } from "../api/user/UserMapper";

const router = express.Router();

const insertUser = insertEntity<UserDocument>(UserModel)

router.post('/login',
    findUserByEmail,
    verifyUser,
    authenticate
);

router.get('/me',
    verifyToken,
    sendAuthData
);

router.post('/register',
    ensureEmailUniqueness,
    mapBodyToEntity(userMapToModel),
    beforeInsertUser,
    insertUser,
    authenticate
);

export default router;