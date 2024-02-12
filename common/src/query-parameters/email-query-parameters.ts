import { SortOption as SortQueryParameters} from "../types";
import { PaginationQueryParameters } from "./pagination-query-parameters";

export interface EmailQueryParameters extends PaginationQueryParameters, SortQueryParameters {
    recipient: string,
    author: string
}