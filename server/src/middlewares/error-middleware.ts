import { ErrorRequestHandler } from "express"
import { logger } from "../utils/logger"

interface CustomError extends Error {
    status: number;
}

export const errorMiddleware: ErrorRequestHandler = (error: CustomError, req, res, next) => {
    if (error) {
        res.status(error.status).send(error.message)
    }
    else {
        res.sendStatus(500)
    }
    
    logger.error(`Status code: ${error.status || 500} \n Message: ${error.message} \n Stack Trace: ${error.stack}`)
}