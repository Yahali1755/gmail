import { Table, TableBody, TableContainer, Paper } from '@mui/material';
import MailRow from './MailRow';
import { FC } from 'react';
import { MailboxCategory } from '../constants/MailboxCategory';
import { useQuery } from 'react-query';

interface MailBoxProps {
  mailBoxCategory: MailboxCategory,
}

const MailBox: FC<MailBoxProps> = ({ mailBoxCategory }) => {
  // useQuery

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {
            [1,2,3,4,5,6,7,8,9,10,11,12,13,2,1,1,1,1,1,1].map(() => <MailRow/>)
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default MailBox