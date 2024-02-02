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

export type ActionsDefinitionMap = Record<string, ApiAction<any, any>>;

export type DefaultActionsDefinition<TViewModel extends BaseViewModel, TQueryParameters extends Record<string, any>> = {
    insert: ApiAction<TViewModel, TViewModel>
    update: ApiAction<TViewModel, TViewModel>
    getById: ApiQuery<{id: string}, TViewModel>
    delete: ApiAction<{id: string}, void>
    getAll: ApiQuery<TQueryParameters, TViewModel[]>
}

export type ToActions<ActionsDefinitionMap> = {
    [TAction in keyof ActionsDefinitionMap]: ActionsDefinitionMap[TAction] extends ApiAction<infer TRequestData, infer TResponse> ? ApiAction<TRequestData, TResponse> : never
}

const getDefaultActions = <TViewModel extends BaseViewModel, TQueryParameters extends Record<string, any> = {}>():
    ToActions<DefaultActionsDefinition<TViewModel, TQueryParameters>> => ({
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

export const useApi = <TViewModel extends BaseViewModel, TQueryParameters extends Record<string, any> = {}, TActionsDefinitionMap extends ActionsDefinitionMap = {}>(typeName: TypeName, 
    apiActions?: ToActions<TActionsDefinitionMap>) => {
    const { token } = useAuth();
    const httpClient = getHttpClient(token, typeName);
    
    const api = createActions({...getDefaultActions<TViewModel, TQueryParameters>()}, httpClient);

    return api;
}