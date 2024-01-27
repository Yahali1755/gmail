import { RequestHandler } from "express";
import { Model, Document } from "mongoose";

type FindEntityByIdRequestHandler<TDocument extends Document> = RequestHandler<{id: string}, {}, {}, {}, {entity: TDocument}>
type FindAllEntitiesRequestHandler<TDocument extends Document> = RequestHandler<{id: string}, {}, {}, {}, {entities: TDocument[]}>

const getQueryFilters =  <TDocument extends Document>(model: Model<TDocument>, query: Record<string, any>) => 
    Object.entries(query).reduce((result, [paramKey, paramValue])=> {
        if (model.schema.paths[paramKey].instance === 'Array') {
            return {...result, paramKey: {$in: [paramValue]}}
        }

        return {...result, paramKey: paramValue}
    }, {})

export const findEntityById = <TDocument extends Document>(model: Model<TDocument>): FindEntityByIdRequestHandler<TDocument> => async (req, res, next) => {
    const entity = await model.findById(req.params.id);

    res.locals.entity = entity;

    next()
}

export const findEntities = <TDocument extends Document>(model: Model<TDocument>): FindAllEntitiesRequestHandler<TDocument> => async (req, res, next) => {
    const entities = await model.find(getQueryFilters(model, req.query));

    res.locals.entities = entities;

    next()
}