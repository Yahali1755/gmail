import {Dialog, DialogContent, DialogTitle, SxProps, Slide, Paper, PaperProps, Box, DialogActions } from '@mui/material';
import React, { FC, ReactNode } from 'react';
import { FormProvider, UseFormReturn} from 'react-hook-form';
import { TransitionProps } from '@mui/material/transitions';
import Draggable from 'react-draggable';

import CloseButton from './CloseButton';

interface FormDialogProps {
  isOpen: boolean
  close: () => void
  dialogTitle?: string
  dialogContentText?: string
  children: ReactNode
  formMethods: UseFormReturn
  dialogStyles?: SxProps
}

const styles = {
  closeButton: {
    position: "absolute", 
    right: 0, 
    top: 0
  }, 
  dialogTitle: {
    cursor: "move"
  }
}

const Transition = React.forwardRef((
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DraggablePaper = (props: PaperProps) =>
      <Draggable
        handle="#draggable-dialog-title"
        cancel={'[class*="MuiDialogContent-root"]'}
      >
        <Paper {...props} />
      </Draggable>
  


const FormDialog: FC<FormDialogProps> = ({ formMethods, dialogStyles, children, isOpen, close, dialogTitle }) => 
    <FormProvider {...formMethods}>
      <Dialog PaperComponent={DraggablePaper} fullWidth maxWidth="md" TransitionComponent={Transition}
        sx={dialogStyles} open={isOpen} onClose={close}>
        {
          dialogTitle && 
            <DialogTitle id="draggable-dialog-title" sx={styles.dialogTitle}> { dialogTitle }</DialogTitle>
        }
        <DialogContent>
          { children }
        </DialogContent>
        <DialogActions>
          <CloseButton sx={styles.closeButton} onClick={close}/>
        </DialogActions>
      </Dialog>
    </FormProvider>


export default FormDialog;