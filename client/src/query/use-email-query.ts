import { TypeName } from "@mail/common";

import { MailboxType } from "../constants/MailboxType";
import { useEmailApi } from "../api/hooks/email-api";
import { useAuth } from "../contexts/auth";
import { useBaseQuery } from "./use-base-query";

const useEmailBoxQueryFilters = (mailboxType: MailboxType) => {
    const { user } = useAuth();

    const emailQueryFiltersDictionary: Record<MailboxType, Record<string, any>> = {
        [MailboxType.Inbox]: {recipients: user.email},
        [MailboxType.Outbox]: {author: user.email}
    }
    
    return emailQueryFiltersDictionary[mailboxType]
}

const useEmailBoxQuery = (mailboxType: MailboxType) => { 
    const api = useEmailApi();
    const emailBoxQueryFilters = useEmailBoxQueryFilters(mailboxType);

    return useBaseQuery({
        filters: emailBoxQueryFilters,
        typeName: TypeName.Email,
        query: api.getAll
    })
}

export default useEmailBoxQuery;
