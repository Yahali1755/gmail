import { Table, TableBody, TableContainer, Paper, CircularProgress } from '@mui/material';
import MailRow from './MailRow';
import { FC } from 'react';
import { MailboxCategory } from '../constants/MailboxCategory';
import { useQuery } from 'react-query';
import { EmailViewModel } from '@mail/common';

interface MailBoxProps {
  mailBoxCategory: MailboxCategory,
  emails: EmailViewModel[]
  isLoading: boolean
}

const MailBox: FC<MailBoxProps> = ({ mailBoxCategory, emails, isLoading }) => {
  // useQuery

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {
            isLoading ?
            <CircularProgress/> :
            emails.map(email => <MailRow email={email} />)
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default MailBox