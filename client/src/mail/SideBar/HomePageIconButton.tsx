import MailIcon from '@mui/icons-material/Mail';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Typography } from '@mui/material';

const HomePageIconButton = () => {
    const reload = () => {
        window.location.reload();
    };

    return (
        <ListItemButton onClick={reload}>
            <ListItemIcon>
                <MailIcon sx={{fontSize: '3em'}}/>
            </ListItemIcon>
            <ListItemText primary={
                <Typography sx={{fontSize: '2em'}}> 
                    Mail 
                </Typography>
            }/>
        </ListItemButton>
    );
};


export default HomePageIconButton;