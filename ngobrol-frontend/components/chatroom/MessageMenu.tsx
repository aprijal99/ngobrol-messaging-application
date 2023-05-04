import {Box} from '@mui/material';
import MessageTopProfile from './messages_menu/MessageTopProfile';
import MessageList from './messages_menu/MessageList';
import MessageInput from './messages_menu/MessageInput';
import ChatroomGreeting from './messages_menu/ChatroomGreeting';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store/store';

const MessageMenu = () => {
  const { activeChat } = useSelector((state: RootState) => state.activeChat);

  return (
    <>
      <Box
        id='message-menu'
        sx={{
          position: 'fixed', width: '100%', top: '0', left: '100%', right: '0', bottom: '0', backgroundColor: '#121212',
          '@media (min-width: 620px)': { left: '480px', },
          '@media (min-width: 950px)': { position: 'relative', left: '0', },
          transition: 'margin 225ms cubic-bezier(0, 0, 0.2, 1) 0ms, left 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
        }}
      >
        {activeChat.chatMode === '' ? <ChatroomGreeting /> : <Box sx={{ display: 'grid', gridTemplateRows: '91px 1fr 75px', }}>
          <MessageTopProfile />
          <MessageList />
          <MessageInput />
        </Box>}
      </Box>
    </>
  );
}

export default MessageMenu;
