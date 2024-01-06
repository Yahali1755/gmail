import { ErrorRequestHandler } from "express"
import { logger } from "../utils/logger"
import { BaseError } from "../errors/BaseError"

export const errorMiddleware: ErrorRequestHandler = (error: Error, req, res, next) => {
    if (error instanceof BaseError) {
        res.status(error.status).send(error.message)

        logger.error(`Status code: ${error.status} \n Message: ${error.message} \n Stack Trace: ${error.stack}`)
    }
    else {
        res.sendStatus(500).send("Internal server error")

        logger.error(`Status code: 500 \n Stack Trace: ${error.stack}`)
    }    
}