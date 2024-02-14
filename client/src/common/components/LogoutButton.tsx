import { FC } from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/auth";
import { Route } from "../../constants/Route";

const LogoutButton: FC = () => {
    const { logout } = useAuth();
    const navigate = useNavigate()

    const handleClick = () => {
        logout();

        navigate(Route.User);
    }
    
    return (
        <IconButton onClick={handleClick} color="inherit">
            <LogoutIcon sx={{height: '30px', width: '30px'}}/>
        </IconButton>
    )
}    

export default LogoutButton;