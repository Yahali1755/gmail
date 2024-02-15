import { BaseViewModel } from "../view-models"

export type PaginatedQueryResponse<TViewModel extends BaseViewModel> = {
    entities: TViewModel[],
    meta: {
        totalCount: number
    }
}