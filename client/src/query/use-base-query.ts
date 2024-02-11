import { useQuery } from "@tanstack/react-query";

import { TypeName } from "@mail/common";
import { ActionFunction } from "../api/hooks/base-api";
import { assign } from "lodash";

export enum SortOrder {
    Decending = -1,
    Acending = 1
}

export type SortOption = {
    sortBy: string,
    sortOrder: SortOrder 
}

export type BaseQueryOptions<TReturnType, TQueryParameters extends Record<string,any> = {}> = {
    typeName: TypeName,
    filters?: TQueryParameters,
    query: ActionFunction<TQueryParameters, TReturnType>
    sort?: SortOption
}

export const useBaseQuery = <TReturnType, TQueryParameters extends Record<string, any> = {}>({typeName, filters, sort, query}: BaseQueryOptions<TReturnType, TQueryParameters>) => {
    const queryParameters = sort?.sortBy ? assign(sort, filters) : filters
    const queryKey = [typeName, sort, filters].filter(x => x);

    return useQuery<TReturnType>({
        queryKey,
        queryFn: () => query(queryParameters),
        staleTime: 30000,
        refetchInterval: 30000
    })
}

