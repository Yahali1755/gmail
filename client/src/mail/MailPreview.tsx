import { SxProps, Typography } from "@mui/material";
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

const MailPreview: FC<MailPreviewProps> = ({ isOpen, close, email:  {author, content, createdAt, subject}}) => {
    const formattedCreatedAt = moment(createdAt).format("lll");

    return (
        <Dialog dialogContentProps={{sx: styles.dialogSize}} dialogTitleProps={{sx: {fontWeight: "bold"}}} sx={styles.dialog} 
            dialogTitle={subject} open={isOpen} onClose={close}>
            <Typography>
                { `From: ${author}` }
            </Typography>
            <Typography>
                { `Date: ${formattedCreatedAt}` }
            </Typography>
            <br/>
            <Typography sx={{wordWrap: "break-word"}} title="Content">
                { content }
            </Typography>                
        </Dialog>
    )
}


export default MailPreview;