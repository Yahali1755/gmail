import { Method} from "axios";
import { mapValues } from 'lodash'

import { HttpClient } from "../data-management/httpClient";
import { ActionsDefinitionMap, ApiAction, DefaultActionsDefinition, ToActions } from "./hooks/base-api";

const variableRegex = /^:[a-zA-Z]+$/g;

const isGetMethod = (method: Method) => ['get', 'GET'].includes(method);

const injectParameters = (rawUrl: string, params: Record<string, any>) => 
    rawUrl?.replace(variableRegex, match => params ? params[match].toString() : '')

export const createAction = <TRequestData, TResponse>({ method, url}: ApiAction<TRequestData, TResponse>, httpClient: HttpClient) => (data: Record<string, any> = {}) => 
    isGetMethod(method) ? httpClient.sendRequest<TRequestData, TResponse>({ method, url, params: data}) : httpClient.sendRequest<TRequestData, TResponse>({ method, url: injectParameters(url, data), data})

export const createActions = (apiActions: ActionsDefinitionMap, httpClient: HttpClient) => 
    mapValues(apiActions, action => createAction(action, httpClient))