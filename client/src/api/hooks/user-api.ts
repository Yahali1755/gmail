import { UserViewModel, TypeName } from "@mail/common";

import { ApiAction, ApiActions, useApi } from "./base-api";

type UserActions = {
    changeTheme: ApiAction<{id: string}, void>
}

export const useUserApi = () => useApi<UserViewModel, {}, UserActions>(TypeName.User, {
    changeTheme: {
        method: 'PUT',
        url: '/:id/changeTheme'
    }
});

