import { useQuery } from "@tanstack/react-query";

import { TypeName } from "@mail/common";
import { ActionFunction } from "../api/hooks/base-api";

type BaseQueryOptions<TReturnType, TQueryParameters extends Record<string,any> = {}> = {
    typeName: TypeName,
    filters: TQueryParameters,
    query: ActionFunction<TQueryParameters, TReturnType>
}

export const useBaseQuery = <TReturnType, TQueryParameters extends Record<string, any> = {}>({typeName, filters, query}: BaseQueryOptions<TReturnType, TQueryParameters>) => 
    useQuery<TReturnType>({
    queryKey: [typeName, filters],
    queryFn: () => query(filters),
    staleTime: 30000
})