import { useForm } from "react-hook-form";
import { FC } from "react";

import { EMAIL_REGEX, EmailViewModel, TypeName } from "@mail/common";

import FormTextField from "../../common/form/FormTextField"
import FormDialog from "../../common/form/FormDialog";
import FormMultipleFreeSoloAutocomplete from "../../common/form/FormMultipleFreeSoloAutocomplete";
import { useEmailApi } from "../../api/hooks/email-api";
import { useQueryClient } from "@tanstack/react-query";
import { useAlerts } from "../../contexts/alerts";

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
    const emailApi = useEmailApi();
    const queryClient = useQueryClient();
    const alerts = useAlerts();

    const submit = (data: EmailViewModel) => {
        emailApi.insert(data)
            .then(() => formMethods.reset())
            .then(() =>
                queryClient.invalidateQueries({ predicate: query => query.queryKey.includes(TypeName.Email)})
            )
            .then(() => alerts.success())
    }

    return (
        <FormDialog isEditEnabled={true} submitButtonProps={{label: "Send"}} onSubmit={submit} fullWidth maxWidth="md" dialogTitle="New Mail" formMethods={formMethods} open={isOpen} onClose={close}>
            <FormMultipleFreeSoloAutocomplete validationRegEx={EMAIL_REGEX} required autoSelect key="recipients" textFieldProps={{variant: "standard", label:"To"}} options={[]} freeSolo multiple autoFocus fullWidth name="recipients"/>
            <FormTextField required={true} key="subject" label="Subject" variant="standard" fullWidth name="subject"/>
            <FormTextField sx={styles.content} key="content" label="" multiline rows={8} variant="standard" fullWidth name="content"/>
        </FormDialog>
    )
}

export default NewMailDialog;