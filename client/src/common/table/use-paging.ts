import { useState } from "react"

const defaultPage = 0;
const defaultPageSize = 10;

export const usePaging = () => {
    const [page, setPage] = useState(defaultPage)
    const [rowsPerPage, setRowsPerPage] = useState(defaultPageSize)

    const changePage = (page: number) => {
        setPage(page);
    }

    const changeRowsPerPage = (rowsPerPage: number) => {
        setRowsPerPage(rowsPerPage)
    }

    return { page, changePage, rowsPerPage, changeRowsPerPage}
}