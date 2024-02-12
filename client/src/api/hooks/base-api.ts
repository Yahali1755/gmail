import { Method } from "axios";

import { BaseViewModel, PaginatedQueryResponse, PaginationQueryParameters, TypeName } from "@mail/common";

import { useAuth } from "../../contexts/auth";
import { createActions } from "../api-actions";
import { getHttpClient } from "../../data-management/httpClient"

export interface ApiAction<TRequestData, TResponse> {
    method: Method,
    url?: string
}

export type ApiQuery<TQueryParameters extends Record<string, any>, TResponse> = ApiAction<TQueryParameters, TResponse>

export type ActionFunction<TData, TResponse> = (data?: TData) => Promise<TResponse>

export type ActionsDefinitionMap = Record<string, ApiAction<any, any>>;

export type ApiActions<TViewModel extends BaseViewModel, TQueryParameters extends Record<string, any> = {}, TActionsDefinitionMap
 extends ActionsDefinitionMap = {}> = DefaultActions<TViewModel, TQueryParameters> & TActionsDefinitionMap

export type DefaultActions<TViewModel extends BaseViewModel, TQueryParameters extends Record<string, any> = {}> = {
    insert: ApiAction<TViewModel, TViewModel>
    update: ApiAction<TViewModel, TViewModel>
    delete: ApiAction<{id: string}, void>
    get: ApiQuery<TQueryParameters, TViewModel[]>
    getPaginated: ApiQuery<TQueryParameters & PaginationQueryParameters, PaginatedQueryResponse<TViewModel>>, 
}

export type ToActions<TActionsDefinitionMap> = {
    [TAction in keyof TActionsDefinitionMap]: TActionsDefinitionMap[TAction] extends ApiAction<infer TRequestData, infer TResponse> ? ActionFunction<TRequestData, TResponse> : never
}

const getDefaultActions = <TViewModel extends BaseViewModel, TQueryParameters extends Record<string, any> = {}>():
    DefaultActions<TViewModel, TQueryParameters> => ({
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
    get: {
        method: 'GET'
    },
    getPaginated: {
        method: 'GET',
        url: '/paginated'
    }
})

export const useApi = <TViewModel extends BaseViewModel, TQueryParameters extends Record<string, any> = {}, TActionsDefinitionMap extends ActionsDefinitionMap = {}>(typeName: TypeName, 
    apiActions?: TActionsDefinitionMap) => {
    const { token } = useAuth();
    const httpClient = getHttpClient(token, typeName);
    const actions = {...getDefaultActions<TViewModel, TQueryParameters>(), ...apiActions ?? {}} as DefaultActions<TViewModel, TQueryParameters> & TActionsDefinitionMap;
    const api = createActions(actions, httpClient);

    return api;
}