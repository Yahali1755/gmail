import { TableCell, TableRow} from '@mui/material';

import { useOpen } from '../common/hooks/use-open';
import MailPreview from './MailPreview';

const MailRow = () => {
  const { isOpen: isMailPreviewOpen, open: openMailPreview, close: closeMailPreview} = useOpen();

  return (
    <>
      <TableRow onClick={openMailPreview} hover>
        <TableCell width="15%"> Author</TableCell>
        <TableCell width="75%"> Content </TableCell>
        <TableCell width="10%" > Date </TableCell>
      </TableRow>
      <MailPreview mail={{author: "yahali100@gmail.com", subject: "almogi", content: "almog systems"}} 
        isOpen={isMailPreviewOpen} close={closeMailPreview}/>
    </>
  )
}

export default MailRow