import React, {useState} from 'react';
import {Box, Divider, IconButton, ListItemIcon, Menu, MenuItem} from '@mui/material';
import {BugReportOutlined, LogoutOutlined, PowerSettingsNew, SettingsOutlined} from '@mui/icons-material';
import {red} from '@mui/material/colors';

const SettingMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleLogout = () => {
    setAnchorEl(null);
    const logoutForm = document.getElementById('logoutForm') as HTMLFormElement | null;
    logoutForm!.submit();
  }

  return (
    <Box
      sx={{
        py: 2, position: 'absolute', bottom: '0', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
      }}
    >
      <IconButton onClick={handleClick}>
        <PowerSettingsNew sx={{ cursor: 'pointer', }} />
      </IconButton>
      <Menu
        id='lock-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left', }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'left', }}
        sx={{ '@media (min-width: 450px)': { left: '7.5px', }, }}
      >
        <MenuItem onClick={handleClose} sx={{ minHeight: 'initial', }}>
          <ListItemIcon>
            <SettingsOutlined fontSize='small' />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose} sx={{ minHeight: 'initial', }}>
          <ListItemIcon>
            <BugReportOutlined fontSize='small' />
          </ListItemIcon>
          Report Bug
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout} sx={{ color: red.A400, minHeight: 'initial', }}>
          <ListItemIcon>
            <LogoutOutlined fontSize='small' color='error' />
          </ListItemIcon>
          <form id='logoutForm' action='/chatroom' method='POST' style={{ visibility: 'hidden', }}></form>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default SettingMenu;
