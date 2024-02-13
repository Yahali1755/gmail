import express from "express"

import emailRouter from "./email/EmailRouter";
import { Route } from "../config/express";
import UserRouter from "./user/UserRouter";

const router = express.Router();

const routes: Route[] = [emailRouter, UserRouter]

routes.forEach(route => {
    router.use(route.path, route.router);
})

export default router;