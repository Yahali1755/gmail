import { FC } from "react";
import { ButtonProps, IconButton } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';

const CloseButton: FC<ButtonProps> = ({...props}) => 
    <IconButton sx={{position: "absolute", right: 0, ...props.sx}} {...props}>
        <CloseIcon/>
    </IconButton>


export default CloseButton