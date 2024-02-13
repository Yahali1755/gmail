import { RequestHandler } from "express";
import { Document } from "mongoose";

import { BaseViewModel, PaginatedQueryResponse } from "@mail/common";

import { BaseMapper } from "./BaseMapper";
import { PaginationLocalsObject } from "./queries";

type SendEntityRequestHandler<TDocument extends Document> = RequestHandler<{}, {}, {}, {}, {entity: TDocument}>
type SendEntitiesRequestHandler<TDocument extends Document> = RequestHandler<{}, {}, {}, {}, {entities: TDocument[]}>
type SendPaginatedEntitiesRequestHandler<TDocument extends Document> = RequestHandler<{}, {}, {}, {}, PaginationLocalsObject<TDocument>>

export const sendSuccess: RequestHandler = (req, res) => res.sendStatus(200);

export const sendEntity = <TDocument extends Document, TViewModel extends BaseViewModel>(mapper: BaseMapper<TDocument, TViewModel>): 
    SendEntityRequestHandler<TDocument> => (req, res) => res.status(200).send(mapper.mapToViewModel(res.locals.entity));

export const sendEntities = <TDocument extends Document, TViewModel extends BaseViewModel>(mapper: BaseMapper<TDocument, TViewModel>): 
    SendEntitiesRequestHandler<TDocument> => (req, res) => res.status(200).send(res.locals.entities.map(mapper.mapToViewModel))

export const sendPaginatedEntities = <TDocument extends Document, TViewModel extends BaseViewModel>(mapper: BaseMapper<TDocument, TViewModel>): 
    SendPaginatedEntitiesRequestHandler<TDocument> => (req, res) => {
    const entities = res.locals.entities.map(mapper.mapToViewModel);

    res.status(200).send({ entities, meta: { totalCount: res.locals.meta.totalCount }} as PaginatedQueryResponse<TViewModel>)
}