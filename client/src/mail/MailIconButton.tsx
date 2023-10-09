import { Typography, IconButton } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';

const styles = {
    text: {
        fontSize: '40px'
    }
}

const MailIconButton = () => {
    const reload = () => {
        window.location.reload();
    };

    return (
        <>
            <IconButton size='large' onClick={reload}>
                <MailIcon sx={styles.text}/>
                <Typography sx={styles.text}> Mail</Typography>
            </IconButton>
        </>
    );
};


export default MailIconButton;