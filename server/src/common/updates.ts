import { RequestHandler } from "express";
import { Document, Model } from "mongoose";
import { handleMongoUpdateError } from "./handlers/mongo-error-handlers";

type UpdatesRequestHandler<TDocument extends Document> = RequestHandler<{}, {}, {}, {}, {entity: TDocument}>

export const insertEntity = <TDocument extends Document>(model: Model<TDocument>):  UpdatesRequestHandler<TDocument> => async (req, res, next) => {
    const newEntity = res.locals.entity

    try {
        await newEntity.save();
    } catch (error) {
        handleMongoUpdateError(error, req, res, next)
    }

    const insertEntity = await model.findById(newEntity._id);

    res.locals.entity = insertEntity;

    next()
}

export const updateEntity = <TDocument extends Document>(model: Model<TDocument>): UpdatesRequestHandler<TDocument> => async (req, res, next) => {
    const {locals: { entity }} = res

    try {
        const updatedEntity = await model.findByIdAndUpdate({_id: entity._id}, entity.toObject(), {new: true});

        res.locals.entity = updatedEntity;
    } catch (error) {
        handleMongoUpdateError(error, req, res, next)
    }

    next()
}

export const deleteEntity = <TDocument extends Document>(): UpdatesRequestHandler<TDocument> => async (req, res, next) => {
    await res.locals.entity.deleteOne();

    next()
}