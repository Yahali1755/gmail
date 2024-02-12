import express from "express"

import { TypeName } from "@mail/common";

import { Route } from "../../config/express";
import { findEntityById } from "../../common/queries";
import { UserModel } from "../../models/User";
import { changeTheme } from "./user-handlers";

const router = express.Router();

const findUser = findEntityById(UserModel)

router.put('/:id/changeTheme',
    findUser,
    changeTheme
)

export default {
    router,
    path: `/${TypeName.User}`
} as Route