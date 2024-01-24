import { RequestHandler } from "express";
import { Model, Document } from "mongoose";

type FindEntityByIdRequestHandler<TDocument extends Document> = RequestHandler<{id: string}, {}, {}, {}, {entity: TDocument}>
type FindAllEntitiesRequestHandler<TDocument extends Document> = RequestHandler<{id: string}, {}, {}, {}, {entities: TDocument[]}>

export const findEntityById = <TDocument extends Document>(model: Model<TDocument>): FindEntityByIdRequestHandler<TDocument> => async (req, res, next) => {
    const entity = await model.findById(req.params.id);

    res.locals.entity = entity;

    next()
}

export const findAllEntities = <TDocument extends Document>(model: Model<TDocument>): FindAllEntitiesRequestHandler<TDocument> => async (req, res, next) => {
    const entities = await model.find()

    res.locals.entities = entities;

    next()
}