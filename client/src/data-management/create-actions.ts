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

const replaceUrlParameters = ({ url }: ApiAction, data) => {
    const params = url.split(':');

    return params.reduce((result, param) => result.replace(param, data[param]), url)
}

export const createActions = (apiActions: ApiActions, sendRequest: (config: AxiosRequestConfig) => Promise<AxiosResponse>) => {
    const actions = {...defaultActions, ...apiActions};

    const doesActionHaveBody = (action: ApiAction) => ['GET', 'PUT', 'PATCH'].includes(action.method);

    return mapValues(actions, action => {
        const { method, url } = action

        return (data?) => {
            const formattedUrl = (url && data) ? replaceUrlParameters(action, data) : url
            
            return doesActionHaveBody ? sendRequest({ method, url: formattedUrl, data}) : sendRequest({ method, url: formattedUrl, data})
        }
    })
}