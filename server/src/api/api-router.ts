import express, { Router } from "express"

import mailRouter from "./mail/mail-router";

const router = express.Router();

export interface Route {
    path: string
    router: Router
}

const routes: Route[] = [mailRouter]

routes.forEach(route => {
    router.use(route.path, route.router);
})

export default router;