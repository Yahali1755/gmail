import { PaginationQueryParameters, SortOrder, TypeName, UserViewModel } from "@mail/common";

import { MailboxType } from "../constants/MailboxType";
import { useEmailApi } from "../api/hooks/email-api";
import { useAuth } from "../contexts/auth";
import { usePaginatedQuery } from "./use-paginated-query";

const getEmailBoxQueryFilters = (mailboxType: MailboxType, user: UserViewModel) => {
    const emailQueryFiltersDictionary: Record<MailboxType, Record<string, any>> = {
        [MailboxType.Inbox]: {recipient: user.email},
        [MailboxType.Outbox]: {author: user.email}
    }
    
    return emailQueryFiltersDictionary[mailboxType]
}

const useEmailBoxQuery = (mailboxType: MailboxType, paginationFilters: PaginationQueryParameters) => { 
    const api = useEmailApi();
    const { user } = useAuth();
    const emailBoxQueryFilters = getEmailBoxQueryFilters(mailboxType, user);

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
