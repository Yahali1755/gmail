import { ApiActions, createActions } from "../create-actions";
import { getHttpClient } from "../httpClient"

export const useApi = (apiActions: ApiActions) => {
    const { sendRequest } = getHttpClient('1');

    const api = createActions(apiActions, sendRequest);

    return api;
}