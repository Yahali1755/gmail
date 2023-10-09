import React, { useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ThemeContext } from './ThemeProvider';

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

const DarkModeToggle = () => {
  const { changeTheme, isDarkMode} = useContext(ThemeContext)

  return (
    <IconButton sx={styles.iconButton} onClick={changeTheme} color="inherit">
      {isDarkMode ? <Brightness7Icon sx={styles.iconsSize} /> : <Brightness4Icon sx={styles.iconsSize} />}
    </IconButton>
  );
};

export default DarkModeToggle;
