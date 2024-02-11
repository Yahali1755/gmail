import { FC, ReactNode } from 'react';
import { UseFormReturn } from 'react-hook-form';

import Dialog from "../Dialog"
import { DialogProps } from '../Dialog';
import SubmitButton, { SubmitButtonProps } from './SubmitButton';
import Form from './Form';
import { DialogActions } from '@mui/material';
import { useAlerts } from '../../contexts/alerts';

interface FormDialogProps extends DialogProps {
  formMethods: UseFormReturn,
  onSubmit?: (data?: Record<string, any>) => Promise<void>
  children: ReactNode
  isEditEnabled?: boolean,
  submitButtonProps?: SubmitButtonProps
}

const FormDialog: FC<FormDialogProps> = ({ onSubmit, formMethods, children, submitButtonProps, isEditEnabled, dialogActions, onClose, ...dialogProps }) => {
  const alerts = useAlerts()

  const wrappedOnSubmit = (data: Record<string, any>) => {
    onSubmit(data)
      .then(() => onClose())
      .then(() => alerts.success())
      .catch(({ message }) => alerts.error(message))
  }

  return (
    <Dialog onClose={onClose} {...dialogProps}>
      <Form formMethods={formMethods} onSubmit={wrappedOnSubmit}>
        { children }
        <DialogActions>
          {isEditEnabled && <SubmitButton {...submitButtonProps}/>}
          { dialogActions }
        </DialogActions>
      </Form>
    </Dialog>
  )
}

export default FormDialog;