import { SortOption as SortQueryParameters} from "..";
import { PaginationQueryParameters } from "./PaginationQueryParameters";

export interface EmailQueryParameters extends PaginationQueryParameters, SortQueryParameters {
    recipient: string,
    author: string
}