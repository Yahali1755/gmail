import { RequestHandler } from "express";
import { Document } from "mongoose";

import { BaseViewModel } from "@mail/common";
import { BaseMapper } from "./BaseMapper";

export const mapBodyToEntity = <TViewModel extends BaseViewModel, TDocument extends Document>(mapper: BaseMapper<TDocument, TViewModel>)
    : RequestHandler<{}, {}, TViewModel, {}, {entity: TDocument}> => (req, res, next) => {
    const entity = mapper.mapToModel(req.body);
    
    res.locals.entity = entity;

    next()
}