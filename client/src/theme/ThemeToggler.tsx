import React from 'react';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import { useTheme } from '../contexts/theme';

const styles = {
  iconsSize: {
    height: '40px',
    width: '40px'
  }
}

const ThemeToggler = () => {
  const { changeTheme, isDarkTheme } = useTheme();

  return (
    <IconButton onClick={changeTheme} color="inherit">
      {isDarkTheme ? <Brightness7Icon sx={styles.iconsSize} /> : <Brightness4Icon sx={styles.iconsSize} />}
    </IconButton>
  );
};

export default ThemeToggler;
