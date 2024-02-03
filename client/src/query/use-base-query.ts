import { TypeName } from "@mail/common";
import { QueryFunction, QueryKey, UseQueryOptions, useQuery } from "react-query";

const STALE_TIME = 30000;

interface BaseQueryOptions extends UseQueryOptions {
    typeName: TypeName,
    filters: Record<string, any>
}

export const useBaseQuery = ({typeName, queryFn, filters}: BaseQueryOptions) => 
    useQuery({
    queryKey: [typeName, filters],
    queryFn,
    staleTime: STALE_TIME
})