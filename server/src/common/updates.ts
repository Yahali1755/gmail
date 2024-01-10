import { RequestHandler } from "express";
import { Model } from "mongoose";

interface Updates {
    insertEntity<T>(model: Model<T>): RequestHandler,
    updateEntity<T>(model: Model<T>): RequestHandler,
    deleteEntity<T>(model: Model<T>): RequestHandler
}

export const updates: Updates = {
    insertEntity: (model) => async (req, res, next) => {
        const newEntity = new model(model.schema, res.locals.entity ? res.locals.entity : req.body)

        await newEntity.save();

        const entity = await model.findById(newEntity._id).lean();

        res.locals.entity = entity;

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