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

import HomePageIconButton from './HomePageIconButton';
import { useOpen } from '../../common/hooks/open';
import NewMailDialog from '../forms/NewMailDialog';
import { MailboxType } from '../../constants/MailboxType';

interface SideBarProps {
  setMailBoxType: (mailboxType: MailboxType) => void,
  mailboxType: MailboxType
}

const SideBar: FC<SideBarProps> = ({ setMailBoxType, mailboxType }) => {
  const {open: openCreateMail, close: closeCreateMail, isOpen: isCreateMailOpen} = useOpen();

  return (
    <Grid width="160px" container direction='column'>
      <List>
        <Grid item>
          <ListItem key='HomePageIconButton' disablePadding>
            <HomePageIconButton/>
          </ListItem>
        </Grid>
        <Grid item>
          <ListItem key='SendMail' disablePadding>
            <ListItemButton onClick={openCreateMail}>
              <ListItemIcon sx={{color: "inherit"}}>
                <CreateIcon/>
              </ListItemIcon>
              <ListItemText primary='Send Mail'/>
            </ListItemButton>
            <NewMailDialog isOpen={isCreateMailOpen} close={closeCreateMail}/>
          </ListItem>
        </Grid>
        <Grid item>
          <ListItem key='Inbox' disablePadding>
            <ListItemButton selected={mailboxType === MailboxType.Inbox} onClick={() => setMailBoxType(MailboxType.Inbox)}>
              <ListItemIcon sx={{color: "inherit"}}>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary='Inbox'/>
            </ListItemButton>
          </ListItem>
        </Grid>
        <Grid item>
          <ListItem key='Sent' disablePadding>
            <ListItemButton selected={mailboxType === MailboxType.Outbox} onClick={() => setMailBoxType(MailboxType.Outbox)}>
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