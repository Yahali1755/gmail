import { Table, TableBody, TableContainer, Paper, Box, TablePagination, TableHead, TableFooter } from '@mui/material';
import { ChangeEvent, FC, MouseEvent} from 'react';

import { MailboxType } from '../../constants/MailboxType';
import MailRow from '../MailRow';
import useEmailBoxQuery from '../../query/use-email-query';
import { useTableStyles } from './styles';
import LoadingPage from '../../exterior/LoadingPage';
import { usePaging } from '../../common/table/use-paging';

interface MailBoxProps {
  mailBoxType: MailboxType
}

const MailBox: FC<MailBoxProps> = ({ mailBoxType }) => {
  const { isLoading, data: emails} = useEmailBoxQuery(mailBoxType);
  const styles = useTableStyles();
  const { page, changePage, rowsPerPage, changeRowsPerPage } = usePaging();

  const handleChangePage = (event: MouseEvent<HTMLButtonElement>, page: number) => {
    changePage(page)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    changePage(0)
    changeRowsPerPage(parseInt(event.target.value))
  }

  return (
    <Box sx={styles.container}>
        <TableContainer sx={styles.tableContainer} component={Paper}>
        { 
          isLoading ?
            <LoadingPage circularProgressProps={{size: 50}}/>
          :
            <>
              <TablePagination
              component="div"
              count={emails?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              labelRowsPerPage={"Emails per page:"}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              />
              <Table>
                  <TableBody>
                  { 
                    emails.map(email => <MailRow email={email} />) 
                  }
                </TableBody>
              </Table>
            </>
        }
        </TableContainer>
    </Box>
  )
}

export default MailBox;