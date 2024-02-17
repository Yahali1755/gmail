import { Document, Model } from "mongoose";

import { BaseViewModel } from "@mail/common";

export type MapToViewModelFunction<TDocument extends Document, TViewModel extends BaseViewModel> = (document: TDocument) => TViewModel

export type MapToModelFunction<TDocument extends Document, TViewModel extends BaseViewModel> = (viewModel: TViewModel) => TDocument

export const baseMapToModel = <TDocument extends Document, TViewModel extends BaseViewModel>
    (model: Model<TDocument>): MapToModelFunction<TDocument, TViewModel> => ({id, ...properties}: TViewModel) =>
    id ? new model({_id: id, ...properties}) : new model({...properties});