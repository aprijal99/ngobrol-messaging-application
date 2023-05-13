import {Box, Typography} from '@mui/material';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../redux/store/store';
import {changeActiveChat} from '../../../redux/slice/activeChatSlice';
import {setReceiverEmail} from '../../../redux/slice/sentMessageSlice';
import {changeToPrivateChat} from '../../../functions/activeChat';
import ProfileAvatar from '../ProfileAvatar';
import {openMessageMenuAndChangeArrow} from './ChatList';

const ContactList = ({ name, status, email, imageUrl }: { name: string, status: string, email: string, imageUrl: string, }) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleOnClick = () => {
    openMessageMenuAndChangeArrow();

    dispatch(changeActiveChat(changeToPrivateChat(email)));
    dispatch(setReceiverEmail(email));
  }

  return (
    <Box
      onClick={handleOnClick}
      sx={{
        p: 1, mx: -1, mb: .5, borderRadius: '10px',
        display: 'flex', cursor: 'pointer',
        ':hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)', },
      }}
    >
      <ProfileAvatar imageUrl={imageUrl} />
      <Box sx={{ display: 'flex', flexGrow: '1', flexDirection: 'column', justifyContent: 'center', }}>
        <Typography sx={{ fontWeight: 'bold', }} >{name}</Typography>
        <Typography sx={{ fontSize: '.9rem', color: 'rgba(255, 255, 255, 0.6)', }} >{status}</Typography>
      </Box>
    </Box>
  );
}

export default ContactList;
