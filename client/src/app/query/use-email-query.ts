import { PaginationQueryParameters, SortOrder, TypeName } from "@mail/common";

import { useEmailApi } from "../api/hooks/email-api";
import { usePaginatedQuery } from "./use-paginated-query";

export const useInboxQuery = (paginationFilters: PaginationQueryParameters) => { 
    const api = useEmailApi();

    return usePaginatedQuery({
        sort: {
            sortBy: "createdAt",
            sortOrder: SortOrder.Decending
        },
        paginationFilters,
        extraQueryKey: "inbox",
        typeName: TypeName.Email,
        query: api.getInbox
    })
}

export const useOutboxQuery = (paginationFilters: PaginationQueryParameters) => { 
    const api = useEmailApi();

    return usePaginatedQuery({
        sort: {
            sortBy: "createdAt",
            sortOrder: SortOrder.Decending
        },
        paginationFilters,
        extraQueryKey: "outbox",
        typeName: TypeName.Email,
        query: api.getOutbox
    })
}