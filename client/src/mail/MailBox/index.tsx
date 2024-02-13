import { Table, TableBody, TableContainer, Paper, Box, TablePagination, TableRow, TableHead } from '@mui/material';
import { ChangeEvent, FC, useEffect } from 'react';

import { MailboxType } from '../../constants/MailboxType';
import MailRow from '../MailRow';
import useEmailBoxQuery from '../../query/use-email-query';
import { useTableStyles } from './styles';
import LoadingPage from '../../common/page/LoadingPage';
import { usePaging } from '../../common/hooks/page';

interface MailBoxProps {
  mailBoxType: MailboxType
}

const MailBox: FC<MailBoxProps> = ({ mailBoxType }) => {
  const styles = useTableStyles();
  const { page, changePage, rowsPerPage, changeRowsPerPage } = usePaging();

  const handlePageChange = (_, page: number) => {
    changePage(page)
  }

  const handleRowsPerPageChange = (event: ChangeEvent<HTMLInputElement>) => {
    changePage(0)
    changeRowsPerPage(parseInt(event.target.value))
  }

  const { isLoading, data: { entities: emails = [], meta: { totalCount = 0} = {}} = {}} = useEmailBoxQuery(mailBoxType, { page, limit: rowsPerPage});

  useEffect(() => {
    changePage(0);
  }, [mailBoxType])

  return (
    <Box sx={styles.container}>
      <TableContainer sx={styles.tableContainer} component={Paper}>
      { 
        isLoading ?
          <LoadingPage circularProgressProps={{size: 50}}/>
        :
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TablePagination
                  count={totalCount}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  labelRowsPerPage={"Emails per page:"}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleRowsPerPageChange}
                />
              </TableRow>
            </TableHead>
            <TableBody>
            { 
              emails.map(email => <MailRow key={email.id} mailboxType={mailBoxType} email={email} />) 
            }
            </TableBody>
          </Table>
        }
        </TableContainer>
    </Box>
  )
}

export default MailBox;