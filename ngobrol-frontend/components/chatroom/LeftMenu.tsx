import UserProfilePicture from './left_menu/UserProfilePicture';
import {Box, Divider} from '@mui/material';
import LeftMenuList from './left_menu/LeftMenuList';
import SettingMenu from './left_menu/SettingMenu';

const LeftMenu = () => {
  return (
    <Box sx={{ position: 'relative', }}>
      <UserProfilePicture />
      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.3)', mx: 2, }} />
      <LeftMenuList />
      <SettingMenu />
    </Box>
  );
}

export default LeftMenu;
