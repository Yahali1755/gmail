import { TableCell, TableRow, Typography} from '@mui/material';
import { FC } from 'react';
import moment from 'moment';

import { EmailViewModel } from '@mail/common';

import { useOpen } from '../common/hooks/use-open';
import MailPreview from './MailPreview';
import { MailboxType } from '../constants/MailboxType';

interface MailRowProps {
  email: EmailViewModel,
  mailboxType: MailboxType
}

const MailRow: FC<MailRowProps> = ({ email, mailboxType }) => {
  const {author, content, createdAt, subject, recipients} = email
  const { isOpen: isMailPreviewOpen, open: openMailPreview, close: closeMailPreview} = useOpen();
  const formattedCreatedAt = moment(createdAt).format("MMM D")
  const displayedRecipients = recipients.join(', ')

  return (
    <>
      <TableRow onClick={openMailPreview} hover>
        <TableCell width="15%"> 
          <Typography fontWeight="bold">
            { mailboxType === MailboxType.Outbox ? `To: ${displayedRecipients}` : author}
          </Typography>
        </TableCell>
        <TableCell sx={{overflow: 'hidden', textOverflow: "ellipsis", maxWidth: 0}}> 
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