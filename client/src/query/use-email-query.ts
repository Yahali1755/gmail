import { PaginationQueryParameters, TypeName, UserViewModel } from "@mail/common";

import { MailboxType } from "../constants/MailboxType";
import { useEmailApi } from "../api/hooks/email-api";
import { useAuth } from "../contexts/auth";
import { usePaginatedQuery } from "./use-paginated-query";

const getEmailBoxQueryFilters = (mailboxType: MailboxType, user: UserViewModel) => {
    const emailQueryFiltersDictionary: Record<MailboxType, Record<string, any>> = {
        [MailboxType.Inbox]: {recipients: user.email},
        [MailboxType.Outbox]: {author: user.email}
    }
    
    return emailQueryFiltersDictionary[mailboxType]
}

const useEmailBoxQuery = (mailboxType: MailboxType, paginationOptions: PaginationQueryParameters) => { 
    const api = useEmailApi();
    const { user } = useAuth();
    const emailBoxQueryFilters = getEmailBoxQueryFilters(mailboxType, user);

    return usePaginatedQuery({
        filters: emailBoxQueryFilters,
        paginationFilters: paginationOptions,
        typeName: TypeName.Email,
        query: api.getPaginated
    })
}

export default useEmailBoxQuery;
