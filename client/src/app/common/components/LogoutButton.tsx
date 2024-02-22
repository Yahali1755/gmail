import { FC } from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton } from "@mui/material";

import { useAuth } from "../../contexts/auth";

const LogoutButton: FC = () => {
    const { logout } = useAuth();
    
    return (
        <IconButton onClick={logout} color="inherit">
            <LogoutIcon sx={{height: '30px', width: '30px'}}/>
        </IconButton>
    )
}    

export default LogoutButton;