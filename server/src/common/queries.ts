import { RequestHandler } from "express";
import { Model } from "mongoose";

interface Queries {
    findEntityById<T>(model: Model<T>): RequestHandler,
    findEntities<T>(model: Model<T>): RequestHandler,
}

export const queries: Queries = {
    findEntityById: (model) => async (req, res, next) => {
        const entity = await model.findById(req.params.id);

        res.locals.entity = entity;

        next()
    },
    findEntities: (model) => async (req, res, next) => {
        const entities = await model.find({});

        res.locals.entities = entities;

        next()
    }
}