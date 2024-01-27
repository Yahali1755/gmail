import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import SendIcon from '@mui/icons-material/Send';
import CreateIcon from '@mui/icons-material/Create';

import HomePageIconButton from './HomePageIconButton';
import { useOpen } from '../../common/hooks/use-open';
import NewMailDialog from '../forms/NewMailDialog';
import { FC } from 'react';
import { MailboxCategory } from '../../constants/MailboxCategory';

interface SideBarProps {
  setMailBoxCategory: (mailboxCategory: MailboxCategory) => void
}

const SideBar: FC<SideBarProps> = ({ setMailBoxCategory }) => {
  const {open: openCreateMail, close: closeCreateMail, isOpen: isCreateMailOpen} = useOpen();

  return (
    <>
      <Drawer anchor="left" open={true} variant='permanent'>
        <List>
          <ListItem key='HomePageIconButton' disablePadding>
            <HomePageIconButton/>
          </ListItem>
          <ListItem key='SendMail' disablePadding>
            <ListItemButton onClick={openCreateMail}>
              <ListItemIcon>
                <CreateIcon/>
              </ListItemIcon>
              <ListItemText primary='Send Mail'/>
            </ListItemButton>
            <NewMailDialog isOpen={isCreateMailOpen} close={closeCreateMail}/>
          </ListItem>
          <ListItem key='Inbox' disablePadding>
            <ListItemButton onClick={() => setMailBoxCategory(MailboxCategory.Inbox)}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary='Inbox'/>
            </ListItemButton>
          </ListItem>
          <ListItem key='Sent' disablePadding>
            <ListItemButton onClick={() => setMailBoxCategory(MailboxCategory.Outbox)}>
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <ListItemText primary='Sent'/>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default SideBar;