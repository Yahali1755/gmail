import { BaseViewModel, TypeName } from "@mail/common";

import { useAuth } from "../../contexts/auth";
import { createActions } from "../api-actions-utils";
import { getHttpClient } from "../../data-management/httpClient"
import { Method } from "axios";

export interface ApiAction {
    method: Method,
    url?: string
}

export type ApiActions = Record<string, ApiAction>

const defaultActions: ApiActions = {
    insert: {
        method: 'POST'
    },
    update: {
        method: 'PUT',
        url: '/id'
    },
    delete: {
        method: 'DELETE'
    },
    get: {
        method: 'GET',
        url: '/id'
    },
    getAll: {
        method: 'GET'
    }
}

export const useApi = <TViewModel extends BaseViewModel>(typeName: TypeName, apiActions?: ApiActions) => {
    const { token } = useAuth();
    const httpClient = getHttpClient(token, typeName);
    const api = createActions<TViewModel>({...apiActions, ...defaultActions}, httpClient);

    return api;
}