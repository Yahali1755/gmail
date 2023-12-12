import { ErrorRequestHandler } from "express"

export const errorMiddleware: ErrorRequestHandler = (error, req, res, next) => {
    if (error) {
        res.status(error.status).send(error.message)
    }
    
    res.sendStatus(500)
}