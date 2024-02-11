import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import { Typography } from '@mui/material';

const HomePageIconButton = () => {
    const reload = () => {
        window.location.reload();
    };

    return (
        <ListItemButton onClick={reload}>
            <img src="../../assets/mail.png"/>
            <ListItemText primary={
                <Typography sx={{fontSize: '2em'}}> 
                    Mail 
                </Typography>
            }/>
        </ListItemButton>
    );
};


export default HomePageIconButton;