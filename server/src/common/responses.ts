import { RequestHandler } from "express";

interface Responses {
    sendSuccess: RequestHandler,
    sendEntity: RequestHandler
    sendEntities: RequestHandler
}

const okStatus = 200;

export const responses: Responses = {
    sendSuccess: (req, res) => res.sendStatus(okStatus),
    sendEntity: (req, res) => res.status(okStatus).send(res.locals.entity),
    sendEntities: (req, res) => res.status(okStatus).send(res.locals.entities)
}