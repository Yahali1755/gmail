import { Table, TableBody, TableContainer, Paper, CircularProgress } from '@mui/material';
import { FC, useEffect } from 'react';

import { MailboxType } from '../constants/MailboxType';
import MailRow from './MailRow';
import useEmailQuery from '../query/use-email-query';

interface MailBoxProps {
  mailBoxType: MailboxType
}

const MailBox: FC<MailBoxProps> = ({ mailBoxType }) => {
  const { isLoading, data: emails} = useEmailQuery(mailBoxType);

  useEffect(() => {
    console.log(emails)
  }, [isLoading, emails])

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {
            isLoading ?
            <CircularProgress size="4em"/> :
            <CircularProgress size="4em"/>
            // emails.map(email => <MailRow email={email} />)
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default MailBox