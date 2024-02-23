import { Method } from "axios";
import { mapValues } from 'lodash'

import { HttpClient } from "../data-management/httpClient";
import { ActionsDefinitionMap, ApiAction, ToActions } from "./hooks/base-api";

const variableRegex = /:[a-zA-Z0-9_]+/g;

const isGetMethod = (method: Method) => method === 'GET';

const injectParameters = (rawUrl: string, params: Record<string, any>) => 
    rawUrl?.replace(variableRegex, match => { 
        const paramKey = match.substring(1)

        return params?.[paramKey] ? `${params[paramKey]}` : ''
    });

export const createQueryAction = ({ method, url}: ApiAction<any, any>, httpClient: HttpClient) => (queryParams: Record<string, any> = {}) => 
    httpClient.sendRequest({ method, url: injectParameters(url, queryParams), params: queryParams})

export const createMutationAction = ({ method, url}: ApiAction<any, any>, httpClient: HttpClient) => (urlParams: Record<string, any> = {}) => 
    httpClient.sendRequest({ method, url: injectParameters(url, urlParams), data: urlParams})

export const createActions = <TActionsDefinitionMap extends ActionsDefinitionMap>(actions: TActionsDefinitionMap, httpClient: HttpClient) => 
    mapValues(actions, action => isGetMethod(action.method) ? createQueryAction(action, httpClient) : createMutationAction(action, httpClient)) as ToActions<TActionsDefinitionMap>