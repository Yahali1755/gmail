import { useForm } from "react-hook-form";
import { FC } from "react";

import { EMAIL_REGEX, EmailViewModel, TypeName } from "@mail/common";

import FormTextField from "../../common/form/FormTextField"
import FormDialog from "../../common/form/FormDialog";
import FormMultipleFreeSoloAutocomplete from "../../common/form/FormMultipleFreeSoloAutocomplete";
import { useEmailApi } from "../../api/hooks/email-api";
import { useQueryClient } from "@tanstack/react-query";

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

const NewEmailDialog: FC<NewMailDialogProps> = ({ isOpen, close }) => {
    const formMethods = useForm();
    const emailApi = useEmailApi();
    const queryClient = useQueryClient();

    const submit = (data: EmailViewModel) => 
        emailApi.insert(data)
            .then(() =>
                queryClient.invalidateQueries({ predicate: query => query.queryKey.includes(TypeName.Email)})
            )
    
    return (
        <FormDialog onSubmissionSuccessMessage="Email sent!" isEditEnabled={true} submitButtonProps={{label: "Send"}} onSubmit={submit} fullWidth maxWidth="md" dialogTitle="New Email" formMethods={formMethods} open={isOpen} onClose={close}>
            <FormMultipleFreeSoloAutocomplete validationRegEx={EMAIL_REGEX} required autoSelect key="recipients" textFieldProps={{variant: "standard", label:"To"}} autoFocus fullWidth name="recipients"/>
            <FormTextField required={true} key="subject" label="Subject" variant="standard" fullWidth name="subject"/>
            <FormTextField sx={styles.content} key="content" label="" multiline rows={8} variant="standard" fullWidth name="content"/>
        </FormDialog>
    )
}

export default NewEmailDialog;