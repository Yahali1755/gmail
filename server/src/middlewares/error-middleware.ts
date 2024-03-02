import { ErrorRequestHandler } from "express"

import { logger } from "../logger"
import { BaseError } from "../errors/BaseError"

export const errorMiddleware: ErrorRequestHandler = (error, req, res, next) => {
    if (error instanceof BaseError) {
        res.type('text/plain')

        res.status(error.status).send(error.message)
    }
    else {
        res.sendStatus(500).send("Internal server error")

        logger.error(error)
    }    
}