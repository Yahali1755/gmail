import { Grid, IconButton, Typography } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import { FC } from 'react';

import CreateMailForm from './forms/CreateMailForm';
import { useOpen } from '../common/form/use-open';

const Navbar: FC = () => {
  const { isOpen, open, close } = useOpen();

  return (
    <Grid left={0} height="80vh" width="150px" position="fixed" container flexDirection="column">
      <Grid position="relative" left='20px' item>
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