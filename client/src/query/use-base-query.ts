import { useQuery } from "@tanstack/react-query";

import { SortOption, TypeName } from "@mail/common";

import { ActionFunction } from "../api/hooks/base-api";

export type BaseQueryOptions<TReturnType, TQueryParameters extends Record<string,any> = {}> = {
    typeName: TypeName,
    filters?: TQueryParameters,
    query: ActionFunction<TQueryParameters, TReturnType>
    sort?: SortOption
}

export const useBaseQuery = <TReturnType, TQueryParameters extends Record<string, any> = {}>({typeName, filters, sort, query}: BaseQueryOptions<TReturnType, TQueryParameters>) => {
    const queryParameters = {...sort, ...filters}

    return useQuery<TReturnType>({
        queryKey: [typeName, sort, filters], 
        queryFn: () => query(queryParameters),
        staleTime: +import.meta.env.ENV_STALE_TIME || 30000,
        refetchInterval: +import.meta.env.ENV_REFETCH_INTERVAL || 30000
    })
}

