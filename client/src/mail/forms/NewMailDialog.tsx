import { useForm } from "react-hook-form";
import { FC } from "react";

import { EmailViewModel, TypeName } from "@mail/common";

import FormTextField from "../../common/form/FormTextField"
import FormDialog from "../../common/form/FormDialog";
import { useApi } from "../../data-management/hooks/base-api";
import FormMultipleFreeSoloAutocomplete from "../../common/form/FormMultipleFreeSoloAutocomplete";

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
    const emailApi = useApi(TypeName.Email)

    const submit = (data: EmailViewModel) => {
        emailApi.insert(data)
    }

    return (
        <FormDialog isEditEnabled={true} submitButtonProps={{label: "Send"}} onSubmit={submit} fullWidth maxWidth="md" dialogTitle="New Mail" formMethods={formMethods} open={isOpen} onClose={close}>
            <FormMultipleFreeSoloAutocomplete autoSelect key="recipients" textFieldProps={{variant: "standard", label:"To", required: true}} options={[]} freeSolo multiple autoFocus fullWidth name="recipients"/>
            <FormTextField required={true} key="subject" label="Subject" variant="standard" fullWidth name="subject"/>
            <FormTextField sx={styles.content} key="content" label="" multiline rows={8} variant="standard" fullWidth name="content"/>
        </FormDialog>
    )
}

export default NewMailDialog;