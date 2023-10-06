import { useForm } from "react-hook-form";
import { Grid } from "@mui/material";
import { FC } from "react";

import FormTextField from "../../common/form/FormTextField"
import FormDialog from "../../common/form/formDialog";

interface CreateMailFormProps {
    isOpen: boolean
    close: () => void
}

const CreateMailForm: FC<CreateMailFormProps> = ({ isOpen, close }) => {
    const formMethods = useForm();

    return (
        <FormDialog dialogTitle="New Mail" formMethods={formMethods} isOpen={isOpen} close={close}>
            <Grid container width='100%' flexDirection='column' alignItems='center' spacing={3}>
                <Grid item> 
                    <FormTextField fullWidth name="Recipients"/>
                </Grid> 
                <Grid width="80%" item> 
                    <FormTextField fullWidth autoFocus name="Subject"/>
                </Grid>
                <Grid width="80%" item> 
                    <FormTextField fullWidth name="Content"/>
                </Grid>
            </Grid>
        </FormDialog>
    )
}

export default CreateMailForm;