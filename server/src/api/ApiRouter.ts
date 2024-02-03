import express, { Router } from "express"

import emailRouter from "./email/EmailRouter";

const router = express.Router();

export interface Route {
    path: string
    router: Router
}

const routes: Route[] = [emailRouter]

routes.forEach(route => {
    router.use(route.path, route.router);
})

export default router;