import { DialogContentText, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { FC, ReactNode } from 'react';
import { FormProvider, UseFormReturn, useForm } from 'react-hook-form';

interface FormDialogProps {
  isOpen: boolean
  close: () => void
  dialogTitle?: string
  dialogContentText?: string
  children: ReactNode
  formMethods: UseFormReturn
}

const FormDialog: FC<FormDialogProps> = ({ formMethods, children, isOpen, close, dialogContentText, dialogTitle }) => 
    <FormProvider {...formMethods}>
      <Dialog open={isOpen} onClose={close}>
        {
          dialogTitle && 
            <DialogTitle> { dialogTitle }</DialogTitle>
        }
        <DialogContent>
          {
            dialogContentText && 
              <DialogContentText> { dialogContentText } </DialogContentText>
          }
          { children }
        </DialogContent>
      </Dialog>
    </FormProvider>

export default FormDialog;