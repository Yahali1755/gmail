import { QueryKey, UseQueryOptions, UseQueryResult, useQuery } from "@tanstack/react-query";

import { TypeName } from "@mail/common";

type BaseQueryOptions<TQueryFnData, TError, TData> 
    = Omit<UseQueryOptions<TQueryFnData, TError, TData, QueryKey> & {
    typeName: TypeName,
    filters: Record<string, any>
}, "queryKey">

export const useBaseQuery = < 
    TQueryFnData = unknown,
    TData = TQueryFnData,
    TError = unknown,
    >({typeName, filters, ...props}: BaseQueryOptions<TQueryFnData, TError, TData>): UseQueryResult<TData, TError>  => 
    useQuery({
    queryKey: [typeName, filters],
    staleTime: 30000,
    ...props
})