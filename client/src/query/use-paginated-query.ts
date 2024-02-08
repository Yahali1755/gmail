import { PaginationQueryParameters } from "@mail/common";
import { BaseQueryOptions, useBaseQuery } from "./use-base-query";

type PaginationQueryOptions<TReturnType, TQueryParameters extends Record<string,any> = {}> = BaseQueryOptions<TReturnType, TQueryParameters> & {
    paginationFilters: PaginationQueryParameters
}

export const usePaginatedQuery = <TReturnType, TQueryParameters extends Record<string, any> = {}>({typeName, filters, query, paginationFilters}: PaginationQueryOptions<TReturnType, TQueryParameters>) => {
    const filtersWithPagination = { ...filters, ...paginationFilters}

    return useBaseQuery({
        typeName,
        filters: filtersWithPagination,
        query
    })
}
