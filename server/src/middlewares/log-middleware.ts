import { RequestHandler } from "express";

import { logger } from "../logger";

export const logMiddleware: RequestHandler = (req, res, next) => {
    res.on('finish', () => {
        logger.info(`[${new Date().toISOString()}]: ${req.method} ${req.originalUrl} reqIp: ${req.ip}`);
    })

    next();
};