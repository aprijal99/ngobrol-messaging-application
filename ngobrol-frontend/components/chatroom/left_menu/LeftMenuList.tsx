import {Contacts, Groups, QuestionAnswer} from '@mui/icons-material';
import {Box} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../redux/store/store';
import {changeActiveMenu} from '../../../redux/slice/menuSlice';

const LeftMenuList = () => {
  const { activeMenu } = useSelector((state: RootState) => state.menu);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      {['chat', 'contact', 'group'].map((menu) => (
        <Box
          key={menu}
          onClick={() => dispatch(changeActiveMenu(menu))}
          sx={{
            my: 2, py: 1, cursor: 'pointer',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            background: activeMenu === menu ? 'linear-gradient(90deg, rgba(25,155,241,1) 0%, rgba(255,255,255,0) 100%)' : '',
          }}
        >
          {menu === 'chat' && <QuestionAnswer />}
          {menu === 'contact' && <Contacts  />}
          {menu === 'group' && <Groups />}
        </Box>
      ))}
    </>
  );
}

export default LeftMenuList;
