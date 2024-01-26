import { useForm } from "react-hook-form";
import { FC } from "react";

import { EmailViewModel, TypeName } from "@mail/common";

import FormTextField from "../../common/form/FormTextField"
import FormDialog from "../../common/form/FormDialog";
import { useApi } from "../../data-management/hooks/api";
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
    const { getValues, formState } = formMethods
    const emailApi = useApi(TypeName.Email)

    console.log(formState)
    console.log(getValues())

    const submit = (data) => {
        console.log('hey')

        emailApi.post(data)
     }

    return (
        <FormDialog isEditEnabled={true} submitButtonProps={{label: "Send"}} onSubmit={submit} fullWidth maxWidth="md" dialogTitle="New Mail" formMethods={formMethods} open={isOpen} onClose={close}>
            <FormMultipleFreeSoloAutocomplete textFieldProps={{variant: "standard", label:"To", required: true}} options={[]} freeSolo multiple autoFocus fullWidth name="recipients"/>
            <FormTextField required={true} variant="standard" fullWidth name="Subject"/>
            <FormTextField sx={styles.content} label="" multiline rows={8} variant="standard" fullWidth name="Content"/>
        </FormDialog>
    )
}

export default NewMailDialog;