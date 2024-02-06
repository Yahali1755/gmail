import { TableCell, TableRow, Typography} from '@mui/material';
import { FC } from 'react';
import moment from 'moment';

import { EmailViewModel } from '@mail/common';

import { useOpen } from '../common/hooks/use-open';
import MailPreview from './MailPreview';

interface MailRowProps {
  email: EmailViewModel
}

const MailRow: FC<MailRowProps> = ({ email }) => {
  const {author, content, createdAt, subject} = email
  const { isOpen: isMailPreviewOpen, open: openMailPreview, close: closeMailPreview} = useOpen();
  const formattedCreatedAt = moment(createdAt).format("MMM D")

  return (
    <>
      <TableRow onClick={openMailPreview} hover>
        <TableCell width="15%"> 
          <Typography fontWeight="bold">
            { author }
          </Typography>
        </TableCell>
        <TableCell sx={{overflow: "hidden", textOverflow: "ellipsis", maxWidth: 0}}> 
          <Typography whiteSpace="nowrap" component="span" fontWeight="bold">
            { subject }
            {' - '}
            <Typography component="span">
              { content }
            </Typography>
          </Typography>
        </TableCell>
        <TableCell width="10%" > { formattedCreatedAt } </TableCell>
      </TableRow>
      <MailPreview email={email} 
        isOpen={isMailPreviewOpen} close={closeMailPreview}/>
    </>
  )
}

export default MailRow