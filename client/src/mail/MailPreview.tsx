import { SxProps, Typography } from "@mui/material";
import { FC } from "react";

import Dialog from "../common/Dialog";

interface MailPreviewProps {
    isOpen: boolean, 
    close: () => void,
    mail: any
}

const styles: Record<string, SxProps> = {
    dialogSize: {
        height: '500px',
        width: '500px'
    }
}

const MailPreview: FC<MailPreviewProps> = ({ isOpen, close, mail }) => 
    <Dialog dialogContentProps={{sx: styles.dialogSize}} dialogTitleProps={{sx: {fontWeight: "bold"}}} sx={styles.dialog} 
        dialogTitle={mail.subject} open={isOpen} onClose={close}>
        <Typography sx={{fontWeight: "bold"}} title="Author">
            { `From: ${mail.author}` }
        </Typography>
        <br/>
        <Typography paragraph title="Content">
            { mail.content}
        </Typography>                
    </Dialog>


export default MailPreview;