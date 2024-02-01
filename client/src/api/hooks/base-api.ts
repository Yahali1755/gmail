import { BaseViewModel, TypeName } from "@mail/common";

import { useAuth } from "../../contexts/auth";
import { createActions } from "../api-actions-utils";
import { getHttpClient } from "../../data-management/httpClient"
import { Method } from "axios";

export interface ApiAction<TRequestData, TResponse> {
    method: Method,
    url?: string
}

export type ApiQuery<TQueryParameters extends Record<string, any>, TResponse> = ApiAction<TQueryParameters, TResponse>

export type ApiActions<TRequestData, TResponse> = Record<string, ApiAction<TRequestData, TResponse>>

export type DefaultActionsDefinition<TViewModel extends BaseViewModel, TQueryParameters extends Record<string, any>> = {
    insert: ApiAction<TViewModel, TViewModel>
    update: ApiAction<TViewModel, TViewModel>,
    getById: ApiQuery<{id: string}, TViewModel>,
    delete: ApiAction<{id: string}, void>,
    getAll: ApiQuery<TQueryParameters, TViewModel[]>
}

const getDefaultActions = <TViewModel extends BaseViewModel, TQueryParameters extends Record<string, any> = {}>():
    DefaultActionsDefinition<TViewModel, TQueryParameters> => ({
    insert: {
        method: 'POST'
    },
    update: {
        method: 'PUT',
        url: '/:id'
    },
    delete: {
        method: 'DELETE'
    },
    getById: {
        method: 'GET',
        url: '/:id'
    },
    getAll: {
        method: 'GET'
    }
})

export const useApi = <TViewModel extends BaseViewModel, TQueryParameters extends Record<string, any>>(typeName: TypeName, apiActions?: ApiActions<TViewModel, TQueryParameters>) => {
    const { token } = useAuth();
    const httpClient = getHttpClient(token, typeName);
    const api = createActions<TViewModel>({...apiActions, ...getDefaultActions()}, httpClient);

    return api;
}