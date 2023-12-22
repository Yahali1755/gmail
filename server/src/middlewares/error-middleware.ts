import { ErrorRequestHandler } from "express"
import { logger } from "../utils/logger"
import { CustomError } from "../errors/CustomError"

export const errorMiddleware: ErrorRequestHandler = (error: CustomError, req, res, next) => {
    if (error.message) {
        res.status(error.status).send(error.message)

        logger.error(`Status code: ${error.status} \n Message: ${error.message} \n Stack Trace: ${error.stack}`)
    }
    else {
        res.sendStatus(500).send("Internal server error")

        logger.error(`Status code: ${error.status} \n Stack Trace: ${error.stack}`)
    }    
}