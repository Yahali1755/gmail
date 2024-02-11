import { IconButton, Typography, TableCell, Select, MenuItem, Menu, Popper } from '@mui/material';
import { FC, useRef, useState} from 'react';
import FilterListIcon from '@mui/icons-material/FilterListRounded';

import { MailboxType } from '../../constants/MailboxType';
import { useOpen } from '../../common/hooks/open';

interface MailBoxProps {
  mailBoxType: MailboxType
}

const MailFilters: FC= () => {
  const [dateFilter, setDateFilter] = useState('');
  const { isOpen, open, close} = useOpen();
  const iconButtonRef = useRef(null);

  return (
    <>
      <IconButton ref={iconButtonRef} onClick={open}>
          <FilterListIcon/>
      </IconButton>
      <Menu anchorEl={iconButtonRef.current} open={isOpen} onClose={close}>
      {
        ["last day", "last week", "last month", "all time"].map(value => 
        <MenuItem 
          onClick={() => setDateFilter(value)} value={value}> { value }
        </MenuItem>
        )
      }
      </Menu>
      <Typography component="span"> Filters </Typography>
    </>
  )
}

export default MailFilters;