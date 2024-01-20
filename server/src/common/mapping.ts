import { RequestHandler } from "express";

import { BaseViewModel } from "@mail/common";

export const mapBodyToEntity = <IViewModel extends BaseViewModel>(mapper): RequestHandler<{}, {}, {}, {}, {entity: IViewModel}> => (req, res, next) => {
    const entity = mapper.mapToModel(req.body);
    
    res.locals.entity = entity;

    next()
}