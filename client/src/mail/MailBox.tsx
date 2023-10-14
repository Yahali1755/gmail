import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';

const MailBox = () => {
  return (
    <TableContainer component={Paper} elevation={3}>
      <Table>
        <TableBody>
          <TableRow hover>
            <TableCell width="10%" > Date </TableCell>
            <TableCell width="75%"> Content </TableCell>
            <TableCell width="15%"> Author</TableCell>
          </TableRow>
          <TableRow>
          <TableCell width="10%" > Date </TableCell>
            <TableCell width="75%"> Content </TableCell>
            <TableCell width="15%"> Author</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default MailBox