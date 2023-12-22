import express, { Router, json, Express } from "express"
import userRouter from "../api/user/user-router"
import { errorMiddleware } from "../middlewares/error-middleware";
import { logMiddleware } from "../middlewares/log-middleware";
import { logger } from "../utils/logger";
import { verifyToken } from "../middlewares/verify-token-middleware";
import apiRouter from "../api/api-router";

require('dotenv').config();

interface Route {
    path: string
    router: Router
}

const configureRoutes = (app: Express) => {
    app.use("/user", userRouter)
    app.use("/api", verifyToken, apiRouter);
} 

export default () => {
    const app = express();

    app.use(json());
    app.use(logMiddleware);

    configureRoutes(app);

    app.use(errorMiddleware)

    app.listen(process.env.PORT, () => logger.info(`server running on port ${process.env.PORT}`))
}