import { Button, Typography } from '@mui/material';

import MailImage from "../../assets/mail.png"

const HomePageIconButton = () => {
    const reload = () => {
        window.location.reload();
    };

    return (
        <Button sx={{width: '160px'}} onClick={reload}>
            <img src={MailImage}/>
            <Typography textTransform='none' fontSize="2em"> 
                Mail 
            </Typography>
        </Button>
    );
};


export default HomePageIconButton;