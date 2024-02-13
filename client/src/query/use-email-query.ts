import { PaginationQueryParameters, SortOrder, TypeName, UserViewModel } from "@mail/common";

import { EmailBoxType } from "../constants/EmailboxType";
import { useEmailApi } from "../api/hooks/email-api";
import { useAuth } from "../contexts/auth";
import { usePaginatedQuery } from "./use-paginated-query";

const getEmailBoxQueryFilters = (emailBoxType: EmailBoxType, user: UserViewModel) => {
    const emailQueryFiltersDictionary: Record<EmailBoxType, Record<string, any>> = {
        [EmailBoxType.Inbox]: {recipient: user.email},
        [EmailBoxType.Outbox]: {author: user.email}
    }
    
    return emailQueryFiltersDictionary[emailBoxType]
}

const useEmailBoxQuery = (emailBoxType: EmailBoxType, paginationFilters: PaginationQueryParameters) => { 
    const api = useEmailApi();
    const { user } = useAuth();
    const emailBoxQueryFilters = getEmailBoxQueryFilters(emailBoxType, user);

    return usePaginatedQuery({
        filters: emailBoxQueryFilters,
        sort: {
            sortBy: "createdAt",
            sortOrder: SortOrder.Decending
        },
        paginationFilters,
        typeName: TypeName.Email,
        query: api.getPaginated
    })
}

export default useEmailBoxQuery;
