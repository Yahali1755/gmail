import { RequestHandler } from "express";
import { Document, Model } from "mongoose";

export const insertEntity = <T extends Document>(model: Model<T>): RequestHandler<{}, {}, {}, {}, {entity: T}> => async ({ body }, res, next) => {
    const newEntity = new model(body)

    await newEntity.save();

    const entity = await model.findById(newEntity._id);

    res.locals.entity = entity;

    next()
}

export const updateEntity = <T extends Document>(model: Model<T>): RequestHandler<{id: string}, {}, {}, {}, {entity: T}> => async (req, res, next) => {
    await model.updateOne({_id: req.params.id}, req.body);

    const entity = await model.findById({_id: req.params.id}, req.body);

    res.locals.entity = entity;

    next()
}

export const deleteEntity = <T extends Document>(model: Model<T>): RequestHandler<{id: string}, {}, {}, {}, {entity: T}> => async (req, res, next) => {
    await model.deleteOne({_id: req.params.id});

    next()
}