import { RequestHandler } from "express";

const okStatus = 200;

export const sendSuccess = <T extends Document>(): RequestHandler => (req, res) => res.sendStatus(okStatus);

export const sendEntity = <T extends Document>(): RequestHandler<{}, {}, {}, {}, {entity: T}> => (req, res) => res.status(okStatus).send(res.locals.entity);

export const sendEntities = <T extends Document>(): RequestHandler<{}, {}, {}, {}, {entities: T}> => (req, res) => res.status(okStatus).send(res.locals.entities);