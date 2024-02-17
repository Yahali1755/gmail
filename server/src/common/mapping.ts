import { RequestHandler } from "express";
import { Document } from "mongoose";

import { BaseViewModel } from "@mail/common";
import { MapToModelFunction } from "./BaseMapper";

export const mapBodyToEntity = <TViewModel extends BaseViewModel, TDocument extends Document>(mapToModel: MapToModelFunction<TDocument, TViewModel>)
    : RequestHandler<{}, {}, TViewModel, {}, {entity: TDocument}> => (req, res, next) => {
    const entity = mapToModel(req.body);
    
    res.locals.entity = entity;

    next()
}