import { Button, Typography } from '@mui/material';

import MailImage from "../../../assets/mail.png"

const HomePageIconButton = () => 
    <Button sx={{width: '160px'}} onClick={() => window.location.reload()}>
        <img src={MailImage}/>
        <Typography textTransform='none' fontSize="2em"> 
            Mail 
        </Typography>
    </Button>



export default HomePageIconButton;