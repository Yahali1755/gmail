import { PaginationQueryParameters, SortOrder, TypeName } from "@mail/common";

import { EmailBoxType } from "../constants/EmailboxType";
import { useEmailApi } from "../api/hooks/email-api";
import { useAuth } from "../contexts/auth";
import { usePaginatedQuery } from "./use-paginated-query";

const getEmailBoxQueryFilters = (emailBoxType: EmailBoxType, email: string) => {
    const emailQueryFiltersDictionary: Record<EmailBoxType, Record<string, any>> = {
        [EmailBoxType.Inbox]: {recipient: email},
        [EmailBoxType.Outbox]: {author: email}
    }
    
    return emailQueryFiltersDictionary[emailBoxType]
}

const useEmailBoxQuery = (emailBoxType: EmailBoxType, paginationFilters: PaginationQueryParameters) => { 
    const api = useEmailApi();
    const emailBoxQueryFilters = getEmailBoxQueryFilters(emailBoxType, 'yahali100@gmail.com');

    return usePaginatedQuery({
        filters: emailBoxQueryFilters,
        sort: {
            sortBy: "createdAt",
            sortOrder: SortOrder.Decending
        },
        paginationFilters,
        typeName: TypeName.Email,
        query: api.getPaginated, 
    })
}

export default useEmailBoxQuery;
