import { FC } from "react";
import { ButtonProps, IconButton } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';

const CloseButton: FC<ButtonProps> = ({...props}) => 
    <IconButton {...props}>
        <CloseIcon/>
    </IconButton>


export default CloseButton