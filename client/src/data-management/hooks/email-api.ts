import { TypeName } from "@mail/common";

import { useApi } from "./base-api";
import { ApiActions } from "../api-actions";

const EmailActions: ApiActions = {
    getInbox: {
        method: 'GET'
    },
    getOutbox: {
        method: 'GET'
    }
}

export const emailApi = useApi(TypeName.Email, EmailActions);