import React from 'react';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '../contexts/theme';
import { useAuth } from '../contexts/auth';
import { useUserApi } from '../api/hooks/user-api';

const styles = {
  iconsSize: {
    height: '40px',
    width: '40px'
  },
  iconButton: {
    position: 'absolute',
    right: 0,
    top: 0
  }
}

const ThemeToggler = () => {
  const { changeTheme, isDarkMode} = useTheme();
  const { user } = useAuth();
  const userApi = useUserApi();

  const handleClick = () => {
    console.log(user)

    if (user) {
      userApi.changeTheme({id: user.id})
    }

    changeTheme()
  }

  const isDarkTheme = user ? user.theme.isDarkTheme && isDarkMode : isDarkMode;

  return (
    <IconButton sx={styles.iconButton} onClick={handleClick} color="inherit">
      {isDarkTheme ? <Brightness7Icon sx={styles.iconsSize} /> : <Brightness4Icon sx={styles.iconsSize} />}
    </IconButton>
  );
};

export default ThemeToggler;
