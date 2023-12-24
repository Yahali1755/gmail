import { FC, ReactNode } from 'react';
import { UseFormReturn } from 'react-hook-form';

import Dialog from "../Dialog"
import { DialogProps } from '../Dialog';
import SubmitButton from './SubmitButton';
import Form from './Form';

interface FormDialogProps extends DialogProps {
  formMethods: UseFormReturn,
  onSubmit: () => void
  children: ReactNode
}

const FormDialog: FC<FormDialogProps> = ({ onSubmit, formMethods, children, ...dialogProps }) =>
  <Dialog {...dialogProps} dialogActions={<SubmitButton/>}>
    <Form formMethods={formMethods} onSubmit={onSubmit}>
      { children }
    </Form>
  </Dialog>

export default FormDialog;