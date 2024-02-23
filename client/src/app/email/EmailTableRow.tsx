import { TableCell, TableRow, Typography} from '@mui/material';
import { FC } from 'react';
import moment from 'moment';

import { EmailViewModel } from '@mail/common';

import { useOpen } from '../common/hooks/open';
import EmailView from './EmailView';
import { EmailBoxType } from '../constants/EmailboxType';

interface EmailTableRowProps {
  email: EmailViewModel,
  emailBoxType: EmailBoxType
}

const EmailTableRow: FC<EmailTableRowProps> = ({ email, emailBoxType }) => {
  const {author, content, createdAt, subject, recipients} = email
  const { isOpen: isEmailViewOpen, open: openEmailView, close: closeEmailView} = useOpen();
  const formattedCreatedAt = moment(createdAt).format("MMM D")
  const displayedRecipients = recipients.join(', ')

  return (
    <>
      <TableRow key={email.id} onClick={openEmailView} hover>
        <TableCell width='200px'> 
          <Typography whiteSpace="nowrap" fontWeight="bold" width='200px' overflow='hidden' textOverflow='ellipsis'>
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
      <EmailView email={email} 
        isOpen={isEmailViewOpen} close={closeEmailView}/>
    </>
  )
}

export default EmailTableRow