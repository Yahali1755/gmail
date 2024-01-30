import { Method} from "axios";
import { mapValues } from 'lodash'

import { BaseViewModel } from "@mail/common";

import { HttpClient } from "../data-management/httpClient";
import { ApiAction, ApiActions } from "./hooks/base-api";

const variableRegex = /^\/[a-zA-Z]+$/g;

const isGetMethod = (method: Method) => ['get', 'GET'].includes(method);

const injectParameters = (rawUrl: string, params: Record<string, any>) => 
    rawUrl?.replace(variableRegex, match => params ? params[match].toString() : '')

export const createAction = <TViewModel extends BaseViewModel>({ method, url}: ApiAction, httpClient: HttpClient) => (data: Record<string, any> = {}) => 
    isGetMethod(method) ? httpClient.sendRequest({ method, url, params: data}) : httpClient.sendRequest({ method, url: injectParameters(url, data), data})

export const createActions = <TViewModel extends BaseViewModel>(apiActions: ApiActions, httpClient: HttpClient) => 
    mapValues(apiActions, action => createAction<TViewModel>(action, httpClient))