import { DialogContentText, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { FC, ReactNode } from 'react';
import { FormProvider, UseFormReturn, useForm } from 'react-hook-form';
import CloseButton from './CloseButton';

interface FormDialogProps {
  isOpen: boolean
  close: () => void
  dialogTitle?: string
  dialogContentText?: string
  children: ReactNode
  formMethods: UseFormReturn
}

const styles = {
  closeButton: {
    position: "absolute", 
    right: 0, 
    top: 0
  }
}

const FormDialog: FC<FormDialogProps> = ({ formMethods, children, isOpen, close, dialogTitle }) => 
    <FormProvider {...formMethods}>
      <Dialog open={isOpen} onClose={close}>
        {
          dialogTitle && 
            <DialogTitle> { dialogTitle }</DialogTitle>
        }
        <DialogContent>
          <CloseButton sx={styles.closeButton} onClick={close}/>
          { children }
        </DialogContent>
      </Dialog>
    </FormProvider>


export default FormDialog;