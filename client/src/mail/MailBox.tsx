import { Table, TableBody, TableContainer, Paper, CircularProgress } from '@mui/material';
import { FC, useEffect } from 'react';

import { MailboxType } from '../constants/MailboxType';
import MailRow from './MailRow';
import useEmailBoxQuery from '../query/use-email-query';

interface MailBoxProps {
  mailBoxType: MailboxType
}

const MailBox: FC<MailBoxProps> = ({ mailBoxType }) => {
  const { isLoading, data: emails} = useEmailBoxQuery(mailBoxType);

  useEffect(() => {
    console.log(emails)
  })

  return (
    <TableContainer component={Paper}>
        { 
          isLoading ?
          <CircularProgress size="4em"/> 
          :
          <TableBody>
            <Table>
            { 
              emails.map(email => <MailRow email={email} />) 
            }
            </Table>
          </TableBody>
        }
    </TableContainer>
  )
}

export default MailBox