import { RequestHandler } from "express";
import { Document, Model } from "mongoose";

type UpdatesRequestHandler<TDocument extends Document> = RequestHandler<{}, {}, {}, {}, {entity: TDocument}>

export const insertEntity = <TDocument extends Document>(model: Model<TDocument>):  UpdatesRequestHandler<TDocument> => async (req, res, next) => {
    const newEntity = new model(res.locals.entity)

    await newEntity.save();

    const insertEntity = await model.findById(newEntity._id);

    res.locals.entity = insertEntity;

    next()
}

export const updateEntity = <TDocument extends Document>(model: Model<TDocument>): UpdatesRequestHandler<TDocument> => async (req, res, next) => {
    const {locals: { entity }} = res

    await model.updateOne({_id: entity._id}, entity.toObject());

    const updatedEntity = await model.findById({_id: entity._id});

    res.locals.entity = updatedEntity;

    next()
}

export const deleteEntity = <TDocument extends Document>(): UpdatesRequestHandler<TDocument> => async (req, res, next) => {
    await res.locals.entity.deleteOne();

    next()
}