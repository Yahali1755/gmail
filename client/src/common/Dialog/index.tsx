import { Dialog as MuiDialog, DialogContent, DialogTitle, SxProps, Slide, Paper, PaperProps, DialogActions, Breakpoint, 
  DialogProps as MuiDialogProps, DialogContentProps, DialogTitleProps } from '@mui/material';
import React, { FC, ReactNode } from 'react';
import { TransitionProps } from '@mui/material/transitions';
import Draggable from 'react-draggable';

import CloseButton from './CloseButton';

export interface DialogProps extends Omit< MuiDialogProps, 'open'> {
  close: () => void
  isOpen: boolean
  dialogTitle?: string
  dialogActions?: ReactNode
  dialogContentProps?: DialogContentProps
  dialogTitleProps?: DialogTitleProps
  fullWidth?: boolean
  maxWidth?: Breakpoint
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
  
const Dialog: FC<DialogProps> = ({ sx, children, isOpen, close, dialogTitle, fullWidth, maxWidth, dialogContentProps, dialogTitleProps, dialogActions }) => 
    <MuiDialog PaperComponent={DraggablePaper} fullWidth={fullWidth} maxWidth={maxWidth} 
      TransitionComponent={Transition} sx={sx} open={isOpen} onClose={close}>
        <DialogTitle id="draggable-dialog-title" {...dialogTitleProps} sx={{...styles.dialogTitle, ...dialogTitleProps?.sx}}> 
          <CloseButton sx={styles.closeButton} onClick={close}/>
          { dialogTitle }
        </DialogTitle>
        <DialogContent {...dialogContentProps}>
          { children }
        </DialogContent>
        <DialogActions>
          {
            dialogActions
          }
        </DialogActions>
    </MuiDialog>


export default Dialog;