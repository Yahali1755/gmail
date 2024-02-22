import { Grid } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import SendIcon from '@mui/icons-material/Send';
import CreateIcon from '@mui/icons-material/Create';
import { FC, ReactNode } from 'react';

import { useOpen } from '../../common/hooks/open';
import NewEmailDialog from '../forms/NewEmailDialog';
import { EmailBoxType } from '../../constants/EmailboxType';

interface SideBarProps {
  setEmailBoxType: (emailBoxType: EmailBoxType) => void,
  emailBoxType: EmailBoxType
}

interface SideBarItem {
  text: string,
  onClick: () => void
  selected: boolean
  iconComponent: ReactNode
}


const SideBar: FC<SideBarProps> = ({ setEmailBoxType, emailBoxType }) => {
  const {open: openCreateEmail, close: closeCreateEmail, isOpen: isCreateEmailOpen} = useOpen();

  const sideBarItems = [
    { text: 'Send Email', onClick: openCreateEmail, iconComponent: <CreateIcon/>},
    { text: 'Inbox', onClick: () => setEmailBoxType(EmailBoxType.Inbox), selected: emailBoxType === EmailBoxType.Inbox, iconComponent: <InboxIcon/>},
    { text: 'Sent', onClick: () => setEmailBoxType(EmailBoxType.Outbox), selected: emailBoxType === EmailBoxType.Outbox, iconComponent: <SendIcon/> }
  ] as SideBarItem[]

  return (
    <Grid width="160px" container direction='column'>
      <List>
        <Grid item>
          {
            sideBarItems.map(({text, onClick, selected, iconComponent}) => 
              <ListItem key={text} disablePadding>
                <ListItemButton selected={selected} onClick={onClick}>
                  <ListItemIcon sx={{color: "inherit"}}>
                    {
                      iconComponent
                    }
                  </ListItemIcon>
                  <ListItemText primary={text}/>
                </ListItemButton>
              </ListItem>
            )
          }
        </Grid>
      </List>
      <NewEmailDialog isOpen={isCreateEmailOpen} close={closeCreateEmail}/> 
    </Grid>
  );
};

export default SideBar;