import { useQuery } from "react-query";

import { BaseViewModel, EmailViewModel, TypeName, UserViewModel } from "@mail/common";

import { MailboxCategory } from "../constants/MailboxCategory";
import { useEmailApi } from "../api/hooks/email-api";
import { AxiosResponse } from "axios";
import { useAuth } from "../contexts/auth";

type AxiosQueryFunction<TViewModel extends BaseViewModel> = Promise<AxiosResponse<TViewModel[], any>>

const getEmailQueryFunction = (mailboxCategory: MailboxCategory): AxiosQueryFunction<EmailViewModel> => {
    const api = useEmailApi();
    const { user } = useAuth();

    const emailQueryFunctionDictionary = {
        [MailboxCategory.Inbox]: api.getAll({recipients: user.email}),
        [MailboxCategory.Outbox]: api.getAll({author: user.email}),
    }
    
    return emailQueryFunctionDictionary[mailboxCategory]
}

const useEmailQuery = (mailboxCategory: MailboxCategory) =>    
    useQuery({
        queryKey: [`${TypeName.Email}/${mailboxCategory}`],
        queryFn: () => getEmailQueryFunction(mailboxCategory)
    })

export default useEmailQuery;
