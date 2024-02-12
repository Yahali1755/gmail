import { DialogContent, SxProps, Typography } from "@mui/material";
import { FC } from "react";
import moment from "moment";

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

const MailPreview: FC<MailPreviewProps> = ({ isOpen, close, email:  {author, content, createdAt, subject, recipients}}) => {
    const formattedCreatedAt = moment(createdAt).format("lll");
    const displayedRecipients = recipients.join(', ')

    return (
        <Dialog dialogTitleProps={{sx: {fontWeight: "bold"}}} sx={styles.dialog} 
            dialogTitle={subject} open={isOpen} onClose={close}>
            <DialogContent sx={styles.dialogSize}>
                <Typography>
                    { `From: ${author}` }
                </Typography>
                <Typography>
                    { `To: ${displayedRecipients}` }
                </Typography>
                <Typography>
                    { `Date: ${formattedCreatedAt}` }
                </Typography>
                <br/>
                <Typography sx={{wordWrap: "break-word"}} title="Content">
                    { content }
                </Typography>  
            </DialogContent>              
        </Dialog>
    )
}


export default MailPreview;