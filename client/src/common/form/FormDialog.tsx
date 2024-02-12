import { FC, ReactNode } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { DialogActions, DialogContent } from '@mui/material';

import Dialog from "../Dialog"
import { DialogProps } from '../Dialog';
import SubmitButton, { SubmitButtonProps } from './SubmitButton';
import Form from './Form';
import { useAlerts } from '../../contexts/alerts';

interface FormDialogProps extends DialogProps {
  formMethods: UseFormReturn,
  onSubmit?: (data?: Record<string, any>) => Promise<void>
  onSubmissionSuccessMessage?: string
  children: ReactNode
  isEditEnabled?: boolean,
  submitButtonProps?: SubmitButtonProps
}

const FormDialog: FC<FormDialogProps> = ({ onSubmit, formMethods, children, submitButtonProps, isEditEnabled, onClose, onSubmissionSuccessMessage, ...dialogProps }) => {
  const alerts = useAlerts()

  const wrappedOnSubmit = (data: Record<string, any>) => {
    onSubmit(data)
      .then(() => onClose())
      .then(() => alerts.success(onSubmissionSuccessMessage))
      .catch(({ message }) => alerts.error(message))
  }

  return (
    <Dialog onClose={onClose} {...dialogProps}>
      <Form formMethods={formMethods} onSubmit={wrappedOnSubmit}>
        <DialogContent>
          { children }
        </DialogContent>
        <DialogActions>
          {isEditEnabled && <SubmitButton {...submitButtonProps}/>}
        </DialogActions>
      </Form>
    </Dialog>
  )
}

export default FormDialog;