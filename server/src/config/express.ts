import express, { Router, json } from "express"
import userRouter from "../api/user/user-router"
import { errorMiddleware } from "../middlewares/error-middleware";
import { logMiddleware } from "../middlewares/log-middleware";
import { logger } from "../utils/logger";
import { verifyToken } from "../middlewares/verify-token-middleware";

require('dotenv').config();

const app = express();

interface Route {
    path: string
    router: Router
}

const routes: Route[] = [{path: "/user", router: userRouter}]

app.use(json());
app.use(verifyToken);
app.use(logMiddleware);

routes.forEach(route => {
    app.use(route.path, route.router)
})

app.use(errorMiddleware)

app.listen(process.env.PORT, () => logger.info(`server running on port ${process.env.PORT}`))