import EmailBox from "../EmailBox";
import { Route } from "../../constants/Route";
import { RouteType } from "../../shell/Routes";
import { useOutboxQuery } from "../../query/use-email-query";
import { usePaging } from "../../common/hooks/page";
import EmailPage from "../EmailPage";

const OutboxPage = () => {
    const { page, changePage, rowsPerPage, changeRowsPerPage, resetPaging } = usePaging();
    const { isLoading, data: { entities: emails, meta: { totalCount = 0 } = {}} = {}} = useOutboxQuery({ page, limit: rowsPerPage});

    return (
        <EmailPage>
            <EmailBox page={page} changePage={changePage} rowsPerPage={rowsPerPage} changeRowsPerPage={changeRowsPerPage}
            resetPaging={resetPaging} isLoading={isLoading} emails={emails} totalCount={totalCount}/>
        </EmailPage>
    )
}

export default {
    path: Route.Outbox,
    component: OutboxPage
} as RouteType
