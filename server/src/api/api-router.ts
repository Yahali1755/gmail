import express, { Router } from "express"

import mailRouter from "./mail/mail-router";

const apiRouter = express.Router();

interface Route {
    path: string
    router: Router
}

const routes: Route[] = [{path: "/mail", router: mailRouter}]

routes.forEach(route => {
    apiRouter.use(route.path, route.router);
})

export default apiRouter;