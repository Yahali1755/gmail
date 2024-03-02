import { RequestHandler } from "express";
import { Model, Document, FilterQuery } from "mongoose";

import { AuthData, SortOption, SortOrder } from "@mail/common";
import { NotFoundError } from "../errors/NotFoundError";

type FindEntityByIdRequestHandler<TDocument extends Document> = RequestHandler<{id: string}, {}, {}, {}, {entity: TDocument}>
type FindAllEntitiesRequestHandler<TDocument extends Document, TQueryParameters extends Record<string, any> = {}> = RequestHandler<{}, {}, {}, TQueryParameters, {entities: TDocument[], filters?: FilterQuery<TDocument>} & AuthData>

export const convertBaseQueryParameters = <TQueryParameters extends Record<string, any> = {}>
    ({page = 0, limit = 0, sortBy ="", sortOrder = SortOrder.Decending}: TQueryParameters) => 
    ({page: +page, limit: +limit, sortBy, sortOrder: +sortOrder as SortOrder})

const getSortArgument = ({sortBy = "", sortOrder= SortOrder.Decending}: SortOption) => sortBy && { [sortBy]: sortOrder}

export const findEntityById = <TDocument extends Document>(model: Model<TDocument>): FindEntityByIdRequestHandler<TDocument> => async (req, res, next) => {
    const entity = await model.findById(req.params.id);

    if (!entity) {
        next(new NotFoundError(`${model} not found`))
    }
    
    res.locals.entity = entity;

    next()
}

export const findEntities = <TDocument extends Document, TQueryParameters extends Record<string, any> = {}>(
    model: Model<TDocument>, 
    convertEntityQueryParameters?: (parameters: TQueryParameters) => Record<string, any>
    ): 
    FindAllEntitiesRequestHandler<TDocument, TQueryParameters> => async (req, res, next) => {   
    const { sortBy, sortOrder } = convertBaseQueryParameters(req.query); 
    const queryFilters = convertEntityQueryParameters ? convertEntityQueryParameters(req.query) : {}
    const filters = {...queryFilters, ...res.locals.filters}
    const sort = getSortArgument({ sortBy, sortOrder})

    const entities = await model.find(filters).sort(sort);

    res.locals.entities = entities;

    next();
}

export type PaginationLocalsObject<TDocument extends Document> = {
    filters?: FilterQuery<TDocument>
    entities: TDocument[]
    meta: {
        totalCount: number
    }
} & AuthData

export type FindPaginatedEntitiesRequestHandler<TDocument extends Document, TQueryParameters extends Record<string, any> = {}> = RequestHandler<{}, {}, {}, TQueryParameters, PaginationLocalsObject<TDocument>>

export const findPaginatedEntities = <TDocument extends Document, TQueryParameters extends Record<string, any> = {}>(
    model: Model<TDocument>,
    convertEntityQueryParameters?: (parameters: TQueryParameters) => Record<string, any>,
    ): 
    FindPaginatedEntitiesRequestHandler<TDocument, TQueryParameters> => async (req, res, next) => {
    const { limit, page, sortBy, sortOrder } = convertBaseQueryParameters(req.query);
    const queryFilters = convertEntityQueryParameters ? convertEntityQueryParameters(req.query) : {}
    const filters = {...queryFilters, ...res.locals.filters}
    const sort = getSortArgument({ sortBy, sortOrder })

    const totalCount = await model.countDocuments(filters);
    const entities = await model.find(filters).skip(page * limit).limit(limit).sort(sort);

    res.locals.entities = entities;
    res.locals.meta = { totalCount }

    next();
}