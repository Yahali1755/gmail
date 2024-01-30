import { EmailViewModel, TypeName } from "@mail/common";

import { ApiActions, useApi } from "./base-api";

const EmailActions: ApiActions = {
    getInbox: {
        method: 'GET'
    },
    getOutbox: {
        method: 'GET'
    }
}

export const useEmailApi = () => useApi<EmailViewModel>(TypeName.Email, EmailActions);