import { TypeName } from "@mail/common";
import { QueryFunction, useQuery } from "react-query";

const STALE_TIME = 30000;

interface BaseQuery {
    typeName: TypeName,
    queryFn: QueryFunction,
    filters: Record<string, any>
}

const useBaseQuery = ({typeName, queryFn, filters}: BaseQuery) => useQuery({
    queryKey: [typeName, filters],
    queryFn,
    staleTime: STALE_TIME
})