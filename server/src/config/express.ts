import express, { Router, json, Express } from "express"
import cors from "cors";
import path from "path";

import authRouter from "../auth/AuthRouter"
import { errorMiddleware } from "../middlewares/error-middleware";
import { logMiddleware } from "../middlewares/log-middleware";
import { logger } from "../logger";
import { verifyToken } from "../middlewares/verify-token-middleware";
import apiRouter from "../api";

const configureRoutes = (app: Express) => {
    app.use("/auth", authRouter)
    app.use("/api", verifyToken, apiRouter);
} 

const configureStaticFiles = (app: Express) => {
    const clientPath = process.env.CLIENT_PATH || path.resolve(__dirname, "../../../client/dist")

    app.use(express.static(clientPath))

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, "../../../client/dist", 'index.html'));
    });
}

export default () => {
    const app = express();

    app.use(json());
    app.use(cors());
    app.use(logMiddleware);

    configureRoutes(app);
    configureStaticFiles(app)

    app.use(errorMiddleware)

    app.listen(process.env.PORT, () => logger.info(`server running on port ${process.env.PORT}`))
}