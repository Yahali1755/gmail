import express from "express"

import emailRouter from "./email/EmailRouter";
import { Route } from "../config/express";

const router = express.Router();

const routes: Route[] = [emailRouter]

routes.forEach(route => {
    router.use(route.path, route.router);
})

export default router;