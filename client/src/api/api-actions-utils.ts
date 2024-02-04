import { Method} from "axios";
import { mapValues } from 'lodash'

import { HttpClient } from "../data-management/httpClient";
import { ActionsDefinitionMap, ApiAction, ApiActions, ToActions } from "./hooks/base-api";

const variableRegex = /^:[a-zA-Z]+$/g;

const isGetMethod = (method: Method) => ['get', 'GET'].includes(method);

const injectParameters = (rawUrl: string, params: Record<string, any>) => 
    rawUrl?.replace(variableRegex, match => params ? params[match].toString() : '')

export const createAction = ({ method, url}: ApiAction<any, any>, httpClient: HttpClient) => (data: Record<string, any> = {}) => 
    isGetMethod(method) ? httpClient.sendRequest({ method, url, params: data}) : httpClient.sendRequest({ method, url: injectParameters(url, data), data})

export const createActions = <TActionsDefinitionMap extends ActionsDefinitionMap>(actions: TActionsDefinitionMap, httpClient: HttpClient): ToActions<TActionsDefinitionMap> => 
    mapValues(actions, action => createAction(action, httpClient)) as ToActions<TActionsDefinitionMap>