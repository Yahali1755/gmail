import { BaseViewModel, TypeName } from "@mail/common";

import { useAuth } from "../../contexts/auth";
import { ApiActions, createActions } from "../api-actions";
import { getHttpClient } from "../httpClient"

export const useApi = <TViewModel extends BaseViewModel>(typeName: TypeName, apiActions?: ApiActions) => {
    const { token } = useAuth();
    const { sendRequest } = getHttpClient<TViewModel>(token, typeName);
    const api = createActions<TViewModel>(apiActions, sendRequest);

    return api;
}