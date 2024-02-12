import { UserViewModel } from "@mail/common";

import { BaseMapper } from "../../common/BaseMapper";
import { UserDocument, UserModel } from "../../models/User";

export class UserMapper extends BaseMapper<UserDocument, UserViewModel> {
    constructor() {
        super(UserModel)
    }

    public mapToViewModel = ({ _id, password, email, theme}: UserDocument) => ({
        id: _id,
        password,
        email,
        theme
    })
}