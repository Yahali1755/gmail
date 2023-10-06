import { Grid, IconButton, useTheme, Typography } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import { FC } from 'react';

import CreateMailForm from './forms/create-mail-form';
import { useOpen } from '../common/form/use-open';

const Navbar: FC = () => {
  const theme = useTheme();
  const { isOpen, open, close } = useOpen();

  return (
    <Grid left={0} height="100vh" width="150px" position="fixed" container flexDirection="column">
      <Grid position="relative" top='10vh' left='20px' item>
        <IconButton onClick={open} sx={{borderRadius: '10px', border: "1px solid"}}>
          <CreateIcon sx={{marginRight: "10px"}}/>
          <Typography> Send Mail</Typography>
        </IconButton>
        <CreateMailForm isOpen={isOpen} close={close}/>
      </Grid>
    </Grid>
  )
}

export default Navbar;