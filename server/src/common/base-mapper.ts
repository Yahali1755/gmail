import { Document, Model } from "mongoose";

import { BaseViewModel } from "@mail/common";

export abstract class BaseMapper<IDocument extends Document, IViewModel extends BaseViewModel,> {
    public model: Model<IDocument>;

    constructor(model: Model<IDocument>) {
        this.model = model;
    }

    public mapToModel = ({id, ...properties}: IViewModel, model: Model<IDocument>) => 
        id ? {_id: id, ...properties} : new model({...properties});

    public abstract mapToViewModel: (document: IDocument) => IViewModel;
}