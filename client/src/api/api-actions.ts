import { Method } from "axios";
import { mapValues } from 'lodash'

import { HttpClient } from "../data-management/httpClient";
import { ActionsDefinitionMap, ApiAction, ToActions } from "./hooks/base-api";

const variableRegex = /:[a-zA-Z0-9_]+/g;

const isGetMethod = (method: Method) => ['get', 'GET'].includes(method);

const injectParameters = (rawUrl: string, params: Record<string, any>) => {
    return rawUrl?.replace(variableRegex, match => { 
        const paramKey = match.substring(1)

        return params?.[paramKey] ? `${params[paramKey]}` : ''
    });
}

export const createAction = ({ method, url}: ApiAction<any, any>, httpClient: HttpClient) => (data: Record<string, any> = {}) => 
    isGetMethod(method) ? httpClient.sendRequest({ method, url: injectParameters(url, data), params: data}) : httpClient.sendRequest({ method, url: injectParameters(url, data), data})

export const createActions = <TActionsDefinitionMap extends ActionsDefinitionMap>(actions: TActionsDefinitionMap, httpClient: HttpClient): ToActions<TActionsDefinitionMap> => 
    mapValues(actions, action => createAction(action, httpClient)) as ToActions<TActionsDefinitionMap>