import { Document, Model } from "mongoose";

import { BaseViewModel } from "@mail/common";

export abstract class BaseMapper<TDocument extends Document, TViewModel extends BaseViewModel> {
    protected model: Model<TDocument>;

    constructor(model: Model<TDocument>) {
        this.model = model;
    }

    public mapToModel = ({id, ...properties}: TViewModel) => 
        id ? new this.model({_id: id, ...properties}) : new this.model({...properties});

    public abstract mapToViewModel: (document: TDocument) => TViewModel;
}