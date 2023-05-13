import {Box, Typography} from '@mui/material';
import {useDispatch, useSelector, useStore} from 'react-redux';
import {AppDispatch, RootState} from '../../../redux/store/store';
import {changeActiveChat} from '../../../redux/slice/activeChatSlice';
import {setGroupId, setReceiverEmail} from '../../../redux/slice/sentMessageSlice';
import {changeToGroupChat, changeToPrivateChat} from '../../../functions/activeChat';
import ProfileAvatar from '../ProfileAvatar';
import fetchUserData from '../../../functions/fetchUserData';
import {addContact} from '../../../redux/slice/contactSlice';
import {UserType} from '../../../redux/slice/userSlice';

export const openMessageMenuAndChangeArrow = () => {
  const messageMenu = document.getElementById('message-menu');
  const arrowBack = document.getElementById('arrow-back');
  const arrowForward = document.getElementById('arrow-forward');

  if(messageMenu && (window.innerWidth < 950)) {
    messageMenu.classList.add('left-0');

    if(arrowBack && arrowForward) {
      arrowBack.style.display = 'initial';
      arrowForward.style.display = 'none';
    }
  }
}

const ChatList = ({ chatId, chat }: { chatId: string | number, chat: { message: string, fileUrl: string, createdAt: number, contactOrGroupName: string, imageUrl: string, }, }) => {
  const date = new Date(chat.createdAt);
  let displayedDate: string = date.toLocaleDateString();
  if(((new Date().getTime() - date.getTime()) / (1000 * 60 * 60)) < 24) {
    displayedDate = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  }

  const { activeChat } = useSelector((state: RootState) => state.activeChat, (oldValue, newValue) => {
    if(oldValue.activeChat.chatMode === null && newValue.activeChat.chatMode !== null) return false;
    if(oldValue.activeChat.contactEmail === null && newValue.activeChat.contactEmail !== null) return false;
    if(oldValue.activeChat.contactEmail !== chatId && newValue.activeChat.contactEmail === chatId) return false;
    if(oldValue.activeChat.contactEmail === chatId && newValue.activeChat.contactEmail !== chatId) return false;
    if(oldValue.activeChat.groupId === null && newValue.activeChat.groupId !== null) return false;
    if(oldValue.activeChat.groupId !== chatId && newValue.activeChat.groupId === chatId) return false;
    return !(oldValue.activeChat.groupId === chatId && newValue.activeChat.groupId !== chatId);
  });

  const store = useStore<RootState>();
  const dispatch = useDispatch<AppDispatch>();

  let chatName: string = '';
  let imageUrl: string = '';
  if(chat.contactOrGroupName === '') {
    if(store.getState().contact.contact.some(c => c.email === chatId)) {
      chatName = store.getState().contact.contact.filter(c => c.email === chatId)[0].name;
      imageUrl = store.getState().contact.contact.filter(c => c.email === chatId)[0].imageUrl;
    } else if(store.getState().group.group.some(g => g.groupId === Number(chatId))) {
      chatName = store.getState().group.group.filter(g => g.groupId === Number(chatId))[0].name;
      imageUrl = store.getState().group.group.filter(g => g.groupId === Number(chatId))[0].imageUrl;
    }
  }

  const handleOnClick = () => {
    if(isNaN(chatId as number)) {
      dispatch(changeActiveChat(changeToPrivateChat(chatId as string)));
      dispatch(setReceiverEmail(chatId));
    } else {
      dispatch(changeActiveChat(changeToGroupChat(chatId as number)));
      dispatch(setGroupId(chatId as number));
    }

    openMessageMenuAndChangeArrow();
  }

  return (
    <Box
      onClick={handleOnClick}
      sx={{
        p: 1, mx: -1, mb: .5, borderRadius: '10px',
        display: 'flex', cursor: 'pointer',
        backgroundColor: activeChat.contactEmail === chatId || activeChat.groupId === chatId ? 'rgba(255, 255, 255, 0.2)' : 'initial',
        ':hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)', },
      }}
    >
      <ProfileAvatar imageUrl={chat.imageUrl !== '' ? chat.imageUrl : imageUrl} />
      <Box sx={{ display: 'flex', flexGrow: '1', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden', }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', }} >
          <Typography sx={{ fontWeight: 'bold', }} >{chat.contactOrGroupName !== '' ? chat.contactOrGroupName : chatName}</Typography>
          <Typography sx={{ fontSize: '.9rem', color: 'rgba(255, 255, 255, 0.6)', }} >{displayedDate}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', }} >
          <Typography
            sx={{
              fontSize: '.9rem', color: 'rgba(255, 255, 255, 0.6)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden',
              display: 'block', flex: 1, mr: 1,
            }}
          >
            {chat.message}
          </Typography>
          <Box
            sx={{
              px: 1, borderRadius: '10px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backgroundColor: '#199bf1',
            }}
          >
            <Typography sx={{ fontSize: '.8rem', }} >500</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ChatList;
