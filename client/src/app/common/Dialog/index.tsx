import { Dialog as MuiDialog, DialogTitle, Slide, Paper, PaperProps,
  DialogProps as MuiDialogProps, DialogTitleProps, SlideProps } from '@mui/material';
import React, { FC, forwardRef } from 'react';
import Draggable from 'react-draggable';

import CloseButton from './CloseButton';

export interface DialogProps extends MuiDialogProps {
  onClose: () => void
  dialogTitle?: string
  dialogTitleProps?: DialogTitleProps
}

const Transition: FC = forwardRef((props: SlideProps, ref: React.Ref<unknown>) => 
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
        <CloseButton onClick={onClose}/>
        <DialogTitle id="draggable-dialog-title" {...dialogTitleProps} sx={{cursor: "move", ...dialogTitleProps?.sx}}> 
          { dialogTitle }
        </DialogTitle>
        { children }
    </MuiDialog>


export default Dialog;