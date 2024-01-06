import { RequestHandler } from "express";
import { Document } from "mongoose";

export class BaseMapper<T> {
    public mapBodyToEntity: RequestHandler = (req, res, next) => {
        const entity = this.mapToModel(req.body);
        
        res.locals.entity = entity;

        next()
    }

    public mapToModel = (viewModel: any) => ({
        _id: viewModel.id,
        ...document
    })

    public mapEntitiesViewModel : RequestHandler = (req, res, next) => {
        
    }

    public mapToViewModel = (document: Document) => ({
        id: document._id,
        ...document
    })
}