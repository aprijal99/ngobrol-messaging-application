import {Avatar, Box} from '@mui/material';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store/store';

const UserProfilePicture = () => {
  const { user } = useSelector((state: RootState) => state.user);

  const handleClickOpenUserDetail = () => {
    const userDetail = document.getElementById('user-detail') as HTMLDivElement;
    if(userDetail) userDetail.classList.remove('translate-x-minus-100-percent');
  }

  return (
    <Box onClick={handleClickOpenUserDetail} sx={{ height: '75px', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
      <Avatar
        alt='User Profile Image' src={user.imageUrl ? `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/image/${user.imageUrl}` : 'https://i.pravatar.cc/150?u=a042581f4e29026024d'}
        sx={{ cursor: 'pointer', }}
      />
    </Box>
  );
}

export default UserProfilePicture;
