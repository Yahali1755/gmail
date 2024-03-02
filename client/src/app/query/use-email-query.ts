import { PaginationQueryParameters, SortOrder, TypeName } from "@mail/common";

import { useEmailApi } from "../api/hooks/email-api";
import { usePaginatedQuery } from "./use-paginated-query";
import { EmailBoxType } from "../constants/EmailboxType";

export const useEmailBoxQueryAction = (emailboxType: EmailBoxType, paginationFilters: PaginationQueryParameters) => { 
    const api = useEmailApi();

    const emailQueryFiltersDictionary: Record<EmailBoxType, Record<string, any>> = {
        [EmailBoxType.Inbox]: api.getInbox,
        [EmailBoxType.Outbox]: api.getOutbox
    }

    return email
}

export const useOutboxQuery = (paginationFilters: PaginationQueryParameters) => { 
    const api = useEmailApi();

    return usePaginatedQuery({
        sort: {
            sortBy: "createdAt",
            sortOrder: SortOrder.Decending
        },
        paginationFilters,
        typeName: TypeName.Email,
        query: api.getOutbox
    })
}