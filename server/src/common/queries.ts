import { RequestHandler } from "express";
import { Model, Document } from "mongoose";

export const findEntityById = <T extends Document>(model: Model<T>): RequestHandler<{id: string}, {}, {}, {}, {entity: T}> => async (req, res, next) => {
    const entity = await model.findById(req.params.id);

    res.locals.entity = entity;

    next()
}

export const findAllEntities = <T extends Document>(model: Model<T>): RequestHandler<{id: string}, {}, {}, {}, {entities: T[]}> => async (req, res, next) => {
    const entities = await model.find()

    res.locals.entities = entities;

    next()
}