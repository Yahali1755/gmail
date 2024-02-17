import { UserViewModel } from "@mail/common";

import { MapToViewModelFunction, baseMapToModel } from "../../common/BaseMapper";
import { UserDocument, UserModel } from "../../models/User";

export const userMapToModel = baseMapToModel(UserModel);

export const userMapToViewModel: MapToViewModelFunction<UserDocument, UserViewModel> = ({ _id, password, email}: UserDocument) => ({
    id: _id,
    password,
    email
})