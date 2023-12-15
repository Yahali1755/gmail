import { Dialog as MuiDialog, DialogContent, DialogTitle, SxProps, Slide, Paper, PaperProps, DialogActions, Breakpoint, DialogContentProps } from '@mui/material';
import React, { FC, ReactNode } from 'react';
import { TransitionProps } from '@mui/material/transitions';
import Draggable from 'react-draggable';

import CloseButton from './CloseButton';

export interface DialogProps {
  isOpen: boolean
  close: () => void
  dialogTitle?: string
  children: ReactNode
  sx?: SxProps
  dialogActions?: ReactNode
  dialogContentStyles?: SxProps
  fullWidth?: boolean
  maxWidth?: Breakpoint;
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
  


const Dialog: FC<DialogProps> = ({ sx, children, isOpen, close, dialogTitle, dialogActions, fullWidth, maxWidth, dialogContentStyles }) => 
    <MuiDialog PaperComponent={DraggablePaper} fullWidth={fullWidth ?? true} maxWidth={maxWidth} 
      TransitionComponent={Transition} sx={sx} open={isOpen} onClose={close}>
        {
          dialogTitle && 
            <DialogTitle id="draggable-dialog-title" sx={styles.dialogTitle}> { dialogTitle }</DialogTitle>
        }
        <DialogContent sx={dialogContentStyles}>
          { children }
        </DialogContent>
        <DialogActions>
          <CloseButton sx={styles.closeButton} onClick={close}/>
          {
            dialogActions
          }
        </DialogActions>
    </MuiDialog>


export default Dialog;