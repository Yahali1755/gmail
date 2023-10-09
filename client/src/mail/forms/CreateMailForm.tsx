import { useForm } from "react-hook-form";
import { Grid } from "@mui/material";
import { FC } from "react";

import FormTextField from "../../common/form/FormTextField"
import FormDialog from "../../common/form/FormDialog";

interface CreateMailFormProps {
    isOpen: boolean
    close: () => void
}

const styles = {
    contentField: {
        '& .MuiInput-underline:before': {
        borderBottom: 'none'
        },
        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
        borderBottom: 'none'
        },
    }
}

const CreateMailForm: FC<CreateMailFormProps> = ({ isOpen, close }) => {
    const formMethods = useForm();

    return (
        <FormDialog dialogTitle="New Mail" formMethods={formMethods} isOpen={isOpen} close={close}>
            <Grid container width='100%' flexDirection='column' alignItems='center'>
                <Grid width="100%" item> 
                    <FormTextField variant="standard" fullWidth name="Recipients"/>
                </Grid> 
                <Grid width="100%" item> 
                    <FormTextField variant="standard" fullWidth autoFocus name="Subject"/>
                </Grid>
                <Grid width="100%" item> 
                    <FormTextField required={false} sx={styles.contentField} label="" multiline rows={8} variant="standard" fullWidth name="Content"/>
                </Grid>
            </Grid>
        </FormDialog>
    )
}

export default CreateMailForm;