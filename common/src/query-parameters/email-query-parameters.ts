import { PaginationQueryParameters } from "./pagination-query-parameters";

export interface EmailQueryParameters extends PaginationQueryParameters{
    recipient: string,
    author: string
}