import { Dialog as MuiDialog, DialogTitle, Slide, Paper, PaperProps,
  DialogProps as MuiDialogProps, DialogTitleProps } from '@mui/material';
import React, { FC } from 'react';
import { TransitionProps } from '@mui/material/transitions';
import Draggable from 'react-draggable';

import CloseButton from './CloseButton';

export interface DialogProps extends MuiDialogProps {
  onClose: () => void
  dialogTitle?: string
  dialogTitleProps?: DialogTitleProps
}

const styles = {
  closeButton: {
    position: "absolute", 
    right: 0
  }, 
  dialogTitle: {
    cursor: "move"
  }
}

const Transition = React.forwardRef((props: TransitionProps & {children: React.ReactElement<any, any>;},ref: React.Ref<unknown>) => 
  <Slide direction="up" ref={ref} {...props} />)

const DraggablePaper = (props: PaperProps) =>
      <Draggable
        handle="#draggable-dialog-title"
        cancel={'[class*="MuiDialogContent-root"]'}
      >
        <Paper {...props} />
      </Draggable>
  
const Dialog: FC<DialogProps> = ({ sx, children, open, onClose, dialogTitle,
  dialogTitleProps, ...props}) => 
    <MuiDialog {...props} PaperComponent={DraggablePaper} 
      TransitionComponent={Transition} sx={sx} open={open} onClose={onClose}>
        <CloseButton sx={styles.closeButton} onClick={onClose}/>
        <DialogTitle id="draggable-dialog-title" {...dialogTitleProps} sx={{...styles.dialogTitle, ...dialogTitleProps?.sx}}> 
          { dialogTitle }
        </DialogTitle>
        { children }
    </MuiDialog>


export default Dialog;