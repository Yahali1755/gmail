import { Table, TableBody, TableContainer, Paper, Box, TablePagination, Grid } from '@mui/material';
import { ChangeEvent, FC, useEffect } from 'react';

import EmailTableRow from '../EmailTableRow';
import { useTableStyles } from './styles';
import LoadingPage from '../../common/page/LoadingPage';
import { usePaging } from '../../common/hooks/page';
import { EmailViewModel } from '@mail/common';

interface EmailBoxProps {
  page: number
  changePage: (page: number) => void
  rowsPerPage: number
  changeRowsPerPage: (rowsPerPage: number) => void
  resetPaging: () => void
  isLoading: boolean
  emails: EmailViewModel[]
  totalCount: number
}

const EmailBox: FC<EmailBoxProps> = ({ page, changePage, rowsPerPage, changeRowsPerPage, resetPaging, isLoading, emails, totalCount }) => {
  const styles = useTableStyles();

  const handlePageChange = (_, page: number) => {
    changePage(page)
  }

  const handleRowsPerPageChange = (event: ChangeEvent<HTMLInputElement>) => {
    resetPaging()
    changeRowsPerPage(parseInt(event.target.value))
  }


  useEffect(() => {
    resetPaging();
  }, [])

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
                emails.map(email => <EmailTableRow key={email.id} email={email} />) 
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