import React, { useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ThemeContext } from './themeProvider';

const styles = {
  iconsSize: {
    height: '5vh',
    width: '5vw'
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
