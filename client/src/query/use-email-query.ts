import { EmailViewModel, TypeName, UserViewModel } from "@mail/common";

import { MailboxType } from "../constants/MailboxType";
import { useEmailApi } from "../api/hooks/email-api";
import { useAuth } from "../contexts/auth";
import { useBaseQuery } from "./use-base-query";
import { AxiosResponse } from "axios";

const getEmailQueryFunction = (mailboxType: MailboxType, user: UserViewModel) => {
    const api = useEmailApi();

    const emailQueryFunctionDictionary = {
        [MailboxType.Inbox]: api.getAll({recipients: user.email}) as Promise<AxiosResponse<EmailViewModel[], any>>,
        [MailboxType.Outbox]: api.getAll({author: user.email}) as Promise<AxiosResponse<EmailViewModel[], any>>,
    }
    
    return emailQueryFunctionDictionary[mailboxType]
}

const useEmailQuery = (mailboxType: MailboxType) => { 
    const { user } = useAuth();

    return useBaseQuery({
        filters: {mailboxType},
        typeName: TypeName.Email,
        queryFn: () => getEmailQueryFunction(mailboxType, user)
    })
}

export default useEmailQuery;
