import { useForm } from "react-hook-form";
import { FC } from "react";

import FormTextField from "../../common/form/FormTextField"
import FormDialog from "../../common/form/FormDialog";

interface NewMailDialogProps {
    isOpen: boolean
    close: () => void
}

const styles = {
    content: {
        '& .MuiInput-underline:before': {
            borderBottom: 'none'
        }
    }
}

const NewMailDialog: FC<NewMailDialogProps> = ({ isOpen, close }) => {
    const formMethods = useForm();

    return (
        <FormDialog fullWidth maxWidth="md" onSubmit={() => {console.log('yay')}} dialogTitle="New Mail" formMethods={formMethods} open={isOpen} close={close}>
            <FormTextField variant="standard" fullWidth autoFocus name="Recipients"/>
            <FormTextField variant="standard" fullWidth name="Subject"/>
            <FormTextField required={false} sx={styles.content} label="" multiline rows={8} variant="standard" fullWidth name="Content"/>
        </FormDialog>
    )
}

export default NewMailDialog;