import { TableCell, TableRow} from '@mui/material';
import { FC } from 'react';

import { EmailViewModel } from '@mail/common';

import { useOpen } from '../common/hooks/use-open';
import MailPreview from './MailPreview';

interface MailRowProps {
  email: EmailViewModel
}

const MailRow: FC<MailRowProps> = ({ email }) => {
  const { isOpen: isMailPreviewOpen, open: openMailPreview, close: closeMailPreview} = useOpen();

  return (
    <>
      <TableRow onClick={openMailPreview} hover>
        <TableCell width="15%"> { email.author }</TableCell>
        <TableCell width="75%"> { email.content } </TableCell>
        <TableCell width="10%" > { email.createdAt.toDateString() } </TableCell>
      </TableRow>
      <MailPreview mail={{author: "yahali100@gmail.com", subject: "almogi", content: "almog systems"}} 
        isOpen={isMailPreviewOpen} close={closeMailPreview}/>
    </>
  )
}

export default MailRow