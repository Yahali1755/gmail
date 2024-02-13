import { Grid } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import SendIcon from '@mui/icons-material/Send';
import CreateIcon from '@mui/icons-material/Create';
import { FC } from 'react';

import { useOpen } from '../../common/hooks/open';
import NewEmailDialog from '../forms/NewEmailDialog';
import { EmailBoxType } from '../../constants/EmailboxType';

interface SideBarProps {
  setEmailBoxType: (emailBoxType: EmailBoxType) => void,
  emailBoxType: EmailBoxType
}

const SideBar: FC<SideBarProps> = ({ setEmailBoxType, emailBoxType }) => {
  const {open: openCreateEmail, close: closeCreateEmail, isOpen: isCreateEmailOpen} = useOpen();

  return (
    <Grid width="160px" container direction='column'>
      <List>
        <Grid item>
          <ListItem key='Send Email' disablePadding>
            <ListItemButton onClick={openCreateEmail}>
              <ListItemIcon sx={{color: "inherit"}}>
                <CreateIcon/>
              </ListItemIcon>
              <ListItemText primary='Send Email'/>
            </ListItemButton>
            <NewEmailDialog isOpen={isCreateEmailOpen} close={closeCreateEmail}/>
          </ListItem>
        </Grid>
        <Grid item>
          <ListItem key='Inbox' disablePadding>
            <ListItemButton selected={emailBoxType === EmailBoxType.Inbox} onClick={() => setEmailBoxType(EmailBoxType.Inbox)}>
              <ListItemIcon sx={{color: "inherit"}}>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary='Inbox'/>
            </ListItemButton>
          </ListItem>
        </Grid>
        <Grid item>
          <ListItem key='Sent' disablePadding>
            <ListItemButton selected={emailBoxType === EmailBoxType.Outbox} onClick={() => setEmailBoxType(EmailBoxType.Outbox)}>
              <ListItemIcon sx={{color: "inherit"}}>
                <SendIcon />
              </ListItemIcon>
              <ListItemText primary='Sent'/>
            </ListItemButton>
          </ListItem>
        </Grid>
      </List>
    </Grid>
  );
};

export default SideBar;