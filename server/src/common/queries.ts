import { RequestHandler } from "express";
import { Model, Document } from "mongoose";

type FindEntityByIdRequestHandler<TDocument extends Document> = RequestHandler<{id: string}, {}, {}, {}, {entity: TDocument}>
type FindAllEntitiesRequestHandler<TDocument extends Document> = RequestHandler<{id: string}, {}, {}, {}, {entities: TDocument[]}>

const parseQueryFilters =  <TDocument extends Document>(model: Model<TDocument>, query: Record<string, any>) => 
    query ? Object.entries(query).reduce((result, [paramKey, paramValue]) => 
     ({...result, [paramKey]: decodeURIComponent(paramValue)})
    , {}) : {}

export const findEntityById = <TDocument extends Document>(model: Model<TDocument>): FindEntityByIdRequestHandler<TDocument> => async (req, res, next) => {
    const entity = await model.findById(req.params.id);

    res.locals.entity = entity;

    next()
}

export const findEntities = <TDocument extends Document>(model: Model<TDocument>): FindAllEntitiesRequestHandler<TDocument> => async (req, res, next) => {
    const filters = parseQueryFilters(model, req.query);

    const entities = await model.find(filters);

    res.locals.entities = entities;

    next()
}