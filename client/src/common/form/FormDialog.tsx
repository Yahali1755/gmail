import { FC } from 'react';
import { FormProvider, UseFormReturn, useForm} from 'react-hook-form';

import Dialog from "../Dialog"
import { DialogProps } from '../Dialog';
import SubmitButton from './SubmitButton';

interface FormDialogProps extends DialogProps {
  formMethods: UseFormReturn,
  onSubmit: () => void
}

const FormDialog: FC<FormDialogProps> = ({ onSubmit, ...dialogProps }) => {
  const formMethods = useForm();

  return (
    <FormProvider {...formMethods}>
      <Dialog {...dialogProps} dialogActions={<SubmitButton onClick={onSubmit}/>}/>
    </FormProvider>
  )
}

export default FormDialog;