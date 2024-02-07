import { Table, TableBody, TableContainer, Paper, CircularProgress, Box } from '@mui/material';
import { FC} from 'react';

import { MailboxType } from '../../constants/MailboxType';
import MailRow from '../MailRow';
import useEmailBoxQuery from '../../query/use-email-query';
import { useTableStyles } from './styles';
import LoadingPage from '../../exterior/LoadingPage';

interface MailBoxProps {
  mailBoxType: MailboxType
}

const MailBox: FC<MailBoxProps> = ({ mailBoxType }) => {
  const { isLoading, data: emails} = useEmailBoxQuery(mailBoxType);
  const styles = useTableStyles();

  return (
    <Box sx={styles.container}>
        <TableContainer sx={styles.tableContainer} component={Paper}>
        { 
          isLoading ?
            <LoadingPage circularProgressProps={{size: 50}}/>
          :
            <Table>
                <TableBody>
                { 
                  emails.map(email => <MailRow email={email} />) 
                }
              </TableBody>
            </Table>
        }
        </TableContainer>
    </Box>
  )
}

export default MailBox;