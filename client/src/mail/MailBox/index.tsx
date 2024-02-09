import { Table, TableBody, TableContainer, Paper, Box, TablePagination, TableRow, IconButton, Typography, TableCell, Select, MenuItem } from '@mui/material';
import { ChangeEvent, FC, useEffect, useState} from 'react';
import FilterListIcon from '@mui/icons-material/FilterListRounded';

import { MailboxType } from '../../constants/MailboxType';
import MailRow from '../MailRow';
import useEmailBoxQuery from '../../query/use-email-query';
import { useTableStyles } from './styles';
import LoadingPage from '../../exterior/LoadingPage';
import { usePaging } from '../../common/table/use-paging';
import MailFilters from './MailFilters';

interface MailBoxProps {
  mailBoxType: MailboxType
}

const MailBox: FC<MailBoxProps> = ({ mailBoxType }) => {
  const styles = useTableStyles();
  const { page, changePage, rowsPerPage, changeRowsPerPage } = usePaging();

  const handleChangePage = (_, page: number) => {
    changePage(page)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
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
            <Table>
              <TableBody>
              <TableRow>
                <MailFilters/>
                <TablePagination
                  count={totalCount}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  labelRowsPerPage={"Emails per page:"}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
              { 
                emails.map(email => <MailRow mailboxType={mailBoxType} email={email} />) 
              }
              </TableBody>
            </Table>
        }
        </TableContainer>
    </Box>
  )
}

export default MailBox;