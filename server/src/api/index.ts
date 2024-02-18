import express, { Router } from "express"

import emailRouter from "./email/EmailRouter";

export interface Route {
    path: string
    router: Router
}
const router = express.Router();

const routes: Route[] = [emailRouter]

routes.forEach(route => {
    router.use(route.path, route.router);
})

export default router;