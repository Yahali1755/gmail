import { Grid, SxProps, Typography } from "@mui/material";
import { FC } from "react";

import Dialog from "../common/Dialog";

interface MailPreviewProps {
    isOpen: boolean, 
    close: () => void,
    mail: any
}

const styles: Record<string, SxProps> = {
    dialogSize: {
        height: '500px'
    }
}

const MailPreview: FC<MailPreviewProps> = ({ isOpen, close, mail }) => {
    return (
        <Dialog dialogContentStyles={styles.dialogSize} sx={styles.dialog} dialogTitle={mail.subject} isOpen={isOpen} close={close}>
            <Typography sx={{fontWeight: "bold"}} title="Author">
                { `From: ${mail.author}` }
            </Typography>
            <br/>
            <Typography paragraph title="Content">
                { mail.content}
            </Typography>                
        </Dialog>
    )
}

export default MailPreview;