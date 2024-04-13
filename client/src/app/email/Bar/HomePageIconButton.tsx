import { Button, Typography } from '@mui/material';

const HomePageIconButton = () => 
    <Button sx={{width: '160px'}} onClick={() => window.location.reload()}>
        <img src={'mail.png'}/>
        <Typography textTransform='none' fontSize="2em"> 
            Mail 
        </Typography>
    </Button>



export default HomePageIconButton;