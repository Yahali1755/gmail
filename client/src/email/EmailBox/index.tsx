import { Table, TableBody, TableContainer, Paper, Box, TablePagination, TableRow, TableHead } from '@mui/material';
import { ChangeEvent, FC, useEffect } from 'react';

import { EmailBoxType } from '../../constants/EmailboxType';
import EmailRow from '../EmailRow';
import useEmailBoxQuery from '../../query/use-email-query';
import { useTableStyles } from './styles';
import LoadingPage from '../../common/page/LoadingPage';
import { usePaging } from '../../common/hooks/page';

interface EmailBoxProps {
  emailBoxType: EmailBoxType
}

const EmailBox: FC<EmailBoxProps> = ({ emailBoxType }) => {
  const styles = useTableStyles();
  const { page, changePage, rowsPerPage, changeRowsPerPage } = usePaging();

  const handlePageChange = (_, page: number) => {
    changePage(page)
  }

  const handleRowsPerPageChange = (event: ChangeEvent<HTMLInputElement>) => {
    changePage(0)
    changeRowsPerPage(parseInt(event.target.value))
  }

  const { isLoading, data: { entities: emails = [], meta: { totalCount = 0} = {}} = {}} = useEmailBoxQuery(emailBoxType, { page, limit: rowsPerPage});

  useEffect(() => {
    changePage(0);
  }, [emailBoxType])

  return (
    <Box sx={styles.container}>
      <TableContainer sx={styles.tableContainer} component={Paper}>
      { 
        <>
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
            {
              !isLoading &&
                <TableBody>
                { 
                  emails.map(email => <EmailRow key={email.id} mailboxType={emailBoxType} email={email} />) 
                }
                </TableBody>
            }
          </Table>
          {
          isLoading &&
          <Box height="90%">
            <LoadingPage circularProgressProps={{size: 50}}/>
          </Box>
          }
        </>
      }
      </TableContainer>
    </Box>
  )
}

export default EmailBox;