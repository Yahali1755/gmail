import { logger } from "../utils/logger";

export const logMiddleware = (req, res, next) => {
    logger.info(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

    next();
};