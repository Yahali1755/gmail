import { useAuth } from "../../contexts/auth";
import { ApiActions, createActions } from "../create-actions";
import { getHttpClient } from "../httpClient"

export const useApi = (apiActions: ApiActions) => {
    const { token } = useAuth() 
    const { sendRequest } = getHttpClient(token);

    const api = createActions(apiActions, sendRequest);

    return api;
}