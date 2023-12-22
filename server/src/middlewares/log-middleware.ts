import { logger } from "../utils/logger";

export const logMiddleware = (req, res, next) => {
    res.on('finish', () => {
        logger.info(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    })

    next();
};