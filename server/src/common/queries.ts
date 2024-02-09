 import { RequestHandler } from "express";
import { Model, Document } from "mongoose";

import { PaginationQueryParameters } from "@mail/common";

type FindEntityByIdRequestHandler<TDocument extends Document> = RequestHandler<{id: string}, {}, {}, {}, {entity: TDocument}>
type FindAllEntitiesRequestHandler<TDocument extends Document, TQueryParameters extends Record<string, any> = {}> = RequestHandler<{}, {}, {}, TQueryParameters, {entities: TDocument[]}>

export const findEntityById = <TDocument extends Document>(model: Model<TDocument>): FindEntityByIdRequestHandler<TDocument> => async (req, res, next) => {
    const entity = await model.findById(req.params.id);

    res.locals.entity = entity;

    next()
}

export const findEntities = <TDocument extends Document, TQueryParameters extends Record<string, any> = {}>(model: Model<TDocument>, filters?: Record<string, any>): 
    FindAllEntitiesRequestHandler<TDocument, TQueryParameters> => async (req, res, next) => {    
    const entities = await model.find(filters ?? {});

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

export const extractPaginationQueryParameters = <TQueryParameters extends Record<string, any> = {}>({page = 0, limit = 0, ...queryParameters}: TQueryParameters) => ({page: +page, limit: +limit, queryParameters})

export const findPaginatedEntities = <TDocument extends Document, TQueryParameters extends Record<string, any>, >(
    model: Model<TDocument>,
    convertEntityQueryParams: (parameters: Omit<TQueryParameters, keyof PaginationQueryParameters>) => Record<string, any>
    ): 
    FindPaginatedEntitiesRequestHandler<TDocument, TQueryParameters> => async (req, res, next) => {
    const { limit, page, queryParameters } = extractPaginationQueryParameters(req.query);
    const filters = convertEntityQueryParams(queryParameters)

    const totalCount = await model.countDocuments(filters);
    const entities = await model.find(filters).skip(page * limit).limit(limit);

    res.locals.entities = entities;
    res.locals.meta = { totalCount }

    next();
}