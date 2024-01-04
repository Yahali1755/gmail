import { AxiosRequestConfig, AxiosResponse, Method } from "axios";
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
        url: '/:id'
    },
    delete: {
        method: 'DELETE'
    },
    get: {
        method: 'GET',
        url: '/:id'
    },
    getAll: {
        method: 'GET'
    }
}

export const createActions = (apiActions: ApiActions, sendRequest: (config: AxiosRequestConfig) => Promise<AxiosResponse>) => {
    const actions = {...defaultActions, ...apiActions};

    return mapValues(actions, ({ method, url }) => sendRequest({ method, url}))
}