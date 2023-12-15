import { FC } from "react";
import { Button, ButtonProps } from "@mui/material"

interface SubmitButtonProps extends ButtonProps {
    label?: string
}

const SubmitButton: FC<SubmitButtonProps> = ({label, sx, ...props}) => 
    <Button {...props} sx={{...sx, textTransform: "none"}} variant="contained"> 
        { label || "Submit" }
    </Button>

export default SubmitButton;

