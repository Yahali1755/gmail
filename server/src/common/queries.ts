import { RequestHandler } from "express";
import { Model } from "mongoose";

export const findEntityById = <T extends Document>(model: Model<T>): RequestHandler<{id: string}, {}, {}, {entity: T}> => async (req, res, next) => {
    const entity = await model.findById(req.params.id).lean();

    res.locals.entity = entity;

    next()
}

export const findEntities = <T extends Document>(model: Model<T>): RequestHandler<{id: string}, {}, {}, {entities: T[]}> => async (req, res, next) => {
    const entities = await model.find({}).lean();

    res.locals.entities = entities;

    next()
}