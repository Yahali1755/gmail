import { ErrorRequestHandler } from "express"

import { logger } from "../logger"
import { BaseError } from "../errors/BaseError"

export const errorMiddleware: ErrorRequestHandler = (error, req, res, next) => {
    const { data = false, message } = error; 

    if (error instanceof BaseError) {
        res.status(error.status).send(data ? {...data, message} : message)
    }
    else {
        res.sendStatus(500).send("Internal server error")

        logger.error(error)
    }    
}