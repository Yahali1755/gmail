import { UseQueryOptions, useQuery } from "@tanstack/react-query";

import { SortOption, TypeName } from "@mail/common";

import { ActionFunction } from "../api/hooks/base-api";

export type BaseQueryOptions<TReturnType, TQueryParameters extends Record<string,any> = {}> = {
    typeName: TypeName,
    filters?: TQueryParameters,
    query: ActionFunction<TQueryParameters, TReturnType>
    sort?: SortOption
    extraQueryKey?: string
} & Omit<UseQueryOptions<TReturnType>, "queryKey" | "queryFn" >

export const useBaseQuery = <TReturnType, TQueryParameters extends Record<string, any> = {}>({typeName, filters, sort, query, extraQueryKey, ...props}: BaseQueryOptions<TReturnType, TQueryParameters>) => {
    const queryParameters = {...sort, ...filters}

    return useQuery<TReturnType>({
        queryKey: [typeName, sort, filters, extraQueryKey],
        queryFn: () => query(queryParameters),
        staleTime: 30000,
        refetchInterval: 30000,
        ...props
    })
}


