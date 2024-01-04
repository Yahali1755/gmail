import { FC } from "react";
import { Button, ButtonProps } from "@mui/material"

export interface SubmitButtonProps extends Omit<ButtonProps, "onClick"> {
    label?: string
}

const SubmitButton: FC<SubmitButtonProps> = ({label, sx, ...props}) => 
    <Button type="submit" {...props} sx={{...sx, textTransform: "none"}} variant="contained"> 
        { label || "Submit" }
    </Button>

export default SubmitButton;

