import { SxProps, Typography } from "@mui/material";
import { FC } from "react";

import Dialog from "../common/Dialog";

interface MailPreviewProps {
    isOpen: boolean, 
    close: () => void,
    email: any
}

const styles: Record<string, SxProps> = {
    dialogSize: {
        height: '500px',
        width: '500px'
    }
}

const MailPreview: FC<MailPreviewProps> = ({ isOpen, close, email }) => 
    <Dialog dialogContentProps={{sx: styles.dialogSize}} dialogTitleProps={{sx: {fontWeight: "bold"}}} sx={styles.dialog} 
        dialogTitle={email.subject} open={isOpen} onClose={close}>
        <Typography sx={{fontWeight: "bold"}} title="Author">
            { `From: ${email.author}` }
        </Typography>
        <br/>
        <Typography paragraph title="Content">
            { email.content}
        </Typography>                
    </Dialog>


export default MailPreview;