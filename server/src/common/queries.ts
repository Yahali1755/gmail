import { RequestHandler } from "express";
import { Model, Document } from "mongoose";

type FindEntityByIdRequestHandler<TDocument extends Document> = RequestHandler<{id: string}, {}, {}, {}, {entity: TDocument}>
type FindAllEntitiesRequestHandler<TDocument extends Document, TQueryParameters extends Record<string, any> = {}> = RequestHandler<{}, {}, {}, TQueryParameters, {entities: TDocument[], filters?: Record<string, any>}>
export type ParseEmailQueryFiltersRequestHandler<TQueryParameters extends Record<string, any> = {}> = RequestHandler<{}, {}, {}, TQueryParameters, {filters?: Record<string, any>}>

export const convertPaginationQueryParameters = <TQueryParameters extends Record<string, any> = {}>({page = 0, limit = 0}: TQueryParameters) => ({page: +page, limit: +limit})

export const findEntityById = <TDocument extends Document>(model: Model<TDocument>): FindEntityByIdRequestHandler<TDocument> => async (req, res, next) => {
    const entity = await model.findById(req.params.id);

    res.locals.entity = entity;

    next()
}

export const findEntities = <TDocument extends Document, TQueryParameters extends Record<string, any> = {}>(model: Model<TDocument>): 
    FindAllEntitiesRequestHandler<TDocument, TQueryParameters> => async (req, res, next) => {
    const { limit, page } = convertPaginationQueryParameters(req.query);
    
    const entities = await model.find(res.locals.filters ?? {}).skip(page * limit).limit(limit);

    res.locals.entities = entities;

    next();
}