import Chat from './main_menu/Chat';
import Contact from './main_menu/Contact';
import Group from './main_menu/Group';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store/store';
import {Box} from '@mui/material';

const MainMenu = () => {
  const { activeMenu } = useSelector((state: RootState) => state.menu);

  return (
    <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.08)', }}>
      {activeMenu === 'chat' && <Chat />}
      {activeMenu === 'contact' && <Contact />}
      {activeMenu === 'group' && <Group />}
    </Box>
  );
}

export default MainMenu;
