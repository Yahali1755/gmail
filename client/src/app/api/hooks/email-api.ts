import { EmailQueryParameters, EmailViewModel, PaginatedQueryResponse, TypeName } from "@mail/common";

import { ApiQuery, useApi } from "./base-api";

export type EmailActions = {
    getInbox: ApiQuery<EmailQueryParameters, PaginatedQueryResponse<EmailViewModel>>, 
    getOutbox: ApiQuery<EmailQueryParameters, PaginatedQueryResponse<EmailViewModel>>
}

export const useEmailApi = () => useApi<EmailViewModel, EmailQueryParameters, EmailActions>(TypeName.Email, {
    getInbox: {
        method: "GET",
        url: "/inbox"
    },
    getOutbox: {
        method: "GET",
        url: "/outbox"
    }
});