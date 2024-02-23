import { Table, TableBody, TableContainer, Paper, Box, TablePagination, Grid } from '@mui/material';
import { ChangeEvent, FC, useEffect } from 'react';

import { EmailBoxType } from '../../constants/EmailboxType';
import EmailTableRow from '../EmailTableRow';
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

  const { isLoading, data: { entities: emails, meta: { totalCount = 0} = {}} = {}} = useEmailBoxQuery(emailBoxType, { page, limit: rowsPerPage});

  useEffect(() => {
    changePage(0);
  }, [emailBoxType])

  return (
    <Box sx={styles.container}>
      <Grid component={Paper} sx={styles.tableContainer} container>
        <Grid item>
          <Grid sx={styles.paginationContainer} container justifyContent='flex-end'>
            <Grid item>
              <TablePagination
                component='div'
                count={totalCount}
                rowsPerPage={rowsPerPage}
                page={isLoading ? 0 : page}
                labelRowsPerPage={"Emails per page:"}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid xs overflow='auto' item>
        {
          isLoading ?
            <LoadingPage circularProgressProps={{size: 50}}/>
          :
          <TableContainer sx={styles.tableContentContainer} component={Paper}>
            <Table>
              <TableBody>
              { 
                emails.map(email => <EmailTableRow key={email.id} emailBoxType={emailBoxType} email={email} />) 
              }     
              </TableBody>
            </Table>
          </TableContainer>
        }
        </Grid>
      </Grid>
    </Box>
  )
}

export default EmailBox;