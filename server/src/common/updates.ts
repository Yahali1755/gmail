import { RequestHandler } from "express";
import { Model } from "mongoose";

interface Updates {
    insertEntity<T>(model: Model<T>): RequestHandler,
    updateEntity<T>(model: Model<T>): RequestHandler,
    deleteEntity<T>(model: Model<T>): RequestHandler
}

const okStatus = 200;

export const updates: Updates = {
    insertEntity: (model) => async (req, res, next) => {
        const newEntity = new model(model.schema, res.locals.entity)

        newEntity.save();

        next()
    },
    updateEntity: (model) => async (req, res, next) => {
        model.updateOne(res.locals.entity._id, res.locals.entity);

        next()
    },
    deleteEntity: (model) => async (req, res, next) => {
        model.deleteOne(res.locals.entity._id);

        next()
    }
}