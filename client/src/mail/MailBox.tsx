import { Table, TableBody, TableContainer, Paper } from '@mui/material';
import MailRow from './MailRow';

const MailBox = () => {
  return (
    <TableContainer component={Paper} elevation={3}>
      <Table>
        <TableBody>
          <MailRow/>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default MailBox