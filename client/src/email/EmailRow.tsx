import { TableCell, TableRow, Typography} from '@mui/material';
import { FC } from 'react';
import moment from 'moment';

import { EmailViewModel } from '@mail/common';

import { useOpen } from '../common/hooks/open';
import EmailPreview from './EmailPreview';
import { EmailBoxType } from '../constants/EmailboxType';

interface EmailRowProps {
  email: EmailViewModel,
  emailBoxType: EmailBoxType
}

const EmailRow: FC<EmailRowProps> = ({ email, emailBoxType }) => {
  const {author, content, createdAt, subject, recipients} = email
  const { isOpen: isEmailPreviewOpen, open: openEmailPreview, close: closeEmailPreview} = useOpen();
  const formattedCreatedAt = moment(createdAt).format("MMM D")
  const displayedRecipients = recipients.join(', ')

  return (
    <>
      <TableRow key={email.id} onClick={openEmailPreview} hover>
        <TableCell width="15%"> 
          <Typography fontWeight="bold">
            { emailBoxType === EmailBoxType.Outbox ? `To: ${displayedRecipients}` : author}
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
        <TableCell width="10%" > 
          { formattedCreatedAt } 
        </TableCell>
      </TableRow>
      <EmailPreview email={email} 
        isOpen={isEmailPreviewOpen} close={closeEmailPreview}/>
    </>
  )
}

export default EmailRow