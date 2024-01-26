import { FC, ReactNode } from 'react';
import { UseFormReturn } from 'react-hook-form';

import Dialog from "../Dialog"
import { DialogProps } from '../Dialog';
import SubmitButton, { SubmitButtonProps } from './SubmitButton';
import Form from './Form';

interface FormDialogProps extends DialogProps {
  formMethods: UseFormReturn,
  onSubmit?: (data?: Record<string, any>) => void
  children: ReactNode
  isEditEnabled?: boolean,
  submitButtonProps?: SubmitButtonProps
}

const FormDialog: FC<FormDialogProps> = ({ onSubmit, formMethods, children, submitButtonProps, isEditEnabled, ...dialogProps }) =>
  <Dialog {...dialogProps}
    dialogActions={
      isEditEnabled && <SubmitButton {...submitButtonProps}/>
    }>
    <Form formMethods={formMethods} onSubmit={onSubmit}>
      { children }
    </Form>
  </Dialog>

export default FormDialog;