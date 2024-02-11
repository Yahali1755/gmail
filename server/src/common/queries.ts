 import { RequestHandler } from "express";
import { Model, Document, SortOrder } from "mongoose";

type FindEntityByIdRequestHandler<TDocument extends Document> = RequestHandler<{id: string}, {}, {}, {}, {entity: TDocument}>
type FindAllEntitiesRequestHandler<TDocument extends Document, TQueryParameters extends Record<string, any> = {}> = RequestHandler<{}, {}, {}, TQueryParameters, {entities: TDocument[]}>

export const findEntityById = <TDocument extends Document>(model: Model<TDocument>): FindEntityByIdRequestHandler<TDocument> => async (req, res, next) => {
    const entity = await model.findById(req.params.id);

    res.locals.entity = entity;

    next()
}

export const findEntities = <TDocument extends Document, TQueryParameters extends Record<string, any> = {}>(model: Model<TDocument>, filters?: Record<string, any>): 
    FindAllEntitiesRequestHandler<TDocument, TQueryParameters> => async (req, res, next) => {   
    const { sortBy, sortOrder } = convertBaseQueryParameters(req.query); 
    const sort = sortBy ? { [sortBy]: sortOrder} : {}
    const entities = await model.find(filters ?? {}).sort(sort);

    res.locals.entities = entities;

    next();
}

export type PaginationLocalsObject<TDocument extends Document> = {
    entities: TDocument[]
    meta: {
        totalCount: number
    }
}

type FindPaginatedEntitiesRequestHandler<TDocument extends Document, TQueryParameters extends Record<string, any>> = RequestHandler<{}, {}, {}, TQueryParameters, PaginationLocalsObject<TDocument>>

export const convertBaseQueryParameters = <TQueryParameters extends Record<string, any> = {}>
    ({page = 0, limit = 0, sortBy ="", sortOrder = -1}: TQueryParameters) => 
    ({page: +page, limit: +limit, sortBy, sortOrder: +sortOrder as SortOrder})

export const findPaginatedEntities = <TDocument extends Document, TQueryParameters extends Record<string, any>, >(
    model: Model<TDocument>,
    convertEntityQueryParameters: (parameters: TQueryParameters) => Record<string, any>
    ): 
    FindPaginatedEntitiesRequestHandler<TDocument, TQueryParameters> => async (req, res, next) => {
    const { limit, page, sortBy, sortOrder } = convertBaseQueryParameters(req.query);
    const filters = convertEntityQueryParameters(req.query)
    const sort = sortBy ? { [sortBy]: sortOrder} : {}

    const totalCount = await model.countDocuments(filters);
    const entities = await model.find(filters).skip(page * limit).limit(limit).sort(sort);

    res.locals.entities = entities;
    res.locals.meta = { totalCount }

    next();
}