import { FC } from 'react';
import { UseFormReturn, useForm } from 'react-hook-form';

import Dialog from "../Dialog"
import { DialogProps } from '../Dialog';
import SubmitButton from './SubmitButton';
import Form from './Form';

interface FormDialogProps extends DialogProps {
  formMethods: UseFormReturn,
  onSubmit: () => void
}

const FormDialog: FC<FormDialogProps> = ({ onSubmit, formMethods, ...dialogProps }) => 
    <Form formMethods={formMethods} onSubmit={onSubmit}>
      <Dialog {...dialogProps} dialogActions={<SubmitButton/>}/>
    </Form>

export default FormDialog;