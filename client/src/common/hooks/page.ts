import { useState } from "react"

const defaultPage = 0;
const defaultPageSize = 25;

export const usePaging = (pageSize?: number) => {
    const [page, setPage] = useState(defaultPage)
    const [rowsPerPage, setRowsPerPage] = useState(pageSize ? pageSize : defaultPageSize)

    const changePage = (page: number) => {
        setPage(page);
    }

    const changeRowsPerPage = (rowsPerPage: number) => {
        setRowsPerPage(rowsPerPage)
    }

    return { page, changePage, rowsPerPage, changeRowsPerPage}
}