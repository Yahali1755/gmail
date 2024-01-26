import { BaseViewModel } from "@mail/common";
import { AxiosRequestConfig, Method, AxiosResponse } from "axios";
import { mapValues } from 'lodash'

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

const variableRegex = /^\/[a-zA-Z]+$/g;

const injectParameters = (rawUrl: string, params: Record<string, any>) => 
    rawUrl.replace(variableRegex, match => params ? params[match].toString() : '')

export const createAction = <TViewModel extends BaseViewModel>({ method, url}: ApiAction, sendRequest: (config: AxiosRequestConfig) => Promise<AxiosResponse<TViewModel>>) => (data: Record<string, any> = {}) => 
    sendRequest({ method, url: injectParameters(url, data), data})

export const createActions = <TViewModel extends BaseViewModel>(apiActions: ApiActions, sendRequest: (config: AxiosRequestConfig) => Promise<AxiosResponse<TViewModel>>) => 
    mapValues({...defaultActions, ...apiActions} as ApiActions, action => createAction<TViewModel>(action, sendRequest))