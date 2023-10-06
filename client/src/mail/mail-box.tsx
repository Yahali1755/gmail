import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
import { useOpen } from '../common/form/use-open'

const styles = {
  tableContainer: {
    borderRadius: '10px',
  }
}

const MailBox = () => {
  const { isOpen, close, open } = useOpen();

  return (
    <TableContainer sx={styles.tableContainer} component={Paper} elevation={3}>
      <Table>
        <TableBody>
          <TableRow hover onClick={open}>
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