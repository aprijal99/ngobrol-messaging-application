import {Box, Container, Divider, IconButton, InputBase, Paper} from '@mui/material';
import {AttachFile, InsertEmoticon, KeyboardVoice} from '@mui/icons-material';
import React from 'react';
import {useDispatch, useStore} from 'react-redux';
import {AppDispatch, RootState} from '../../../redux/store/store';
import {setGroupMessage, setMessage} from '../../../redux/slice/sentMessageSlice';
import {addIncomingMessage} from '../../../redux/slice/messageSlice';
import {changeOneCurrentGroupChat, changeOneCurrentPrivateChat} from '../../../redux/slice/chatSlice';
import {stompClient} from '../../../pages/chatroom';
import {addIncomingGroupMessage} from '../../../redux/slice/groupMessageSlice';

const MessageInput = () => {
  const dispatch = useDispatch<AppDispatch>();
  const store = useStore<RootState>();

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.code === 'Enter') {
      const chatMode = store.getState().activeChat.activeChat.chatMode;

      if(chatMode === 'private') {
        handleSetMessage(e.currentTarget.value)
          .then(() => {
            const sentMessage = store.getState().sentMessage.sentMessage;
            stompClient.send('/app/private-message', {}, JSON.stringify(sentMessage));
            dispatch(addIncomingMessage({ email: sentMessage.receiverEmail, message: sentMessage, }));
            dispatch(changeOneCurrentPrivateChat({ email: sentMessage.receiverEmail, message: sentMessage, }));
          });
      } else {
        handleSetGroupMessage(e.currentTarget.value)
          .then(() => {
            const sentGroupMessage = store.getState().sentMessage.sentGroupMessage;
            stompClient.send('/app/group-message', {}, JSON.stringify(sentGroupMessage));
            dispatch(addIncomingGroupMessage({ groupId: sentGroupMessage.groupId, groupMessage: sentGroupMessage, }));
            dispatch(changeOneCurrentGroupChat({ groupId: sentGroupMessage.groupId, groupMessage: sentGroupMessage, }));
          });
      }

      e.currentTarget.value = '';

      const scrollableMessageMenu = e.currentTarget.parentNode?.parentNode?.parentNode?.parentNode?.previousSibling as HTMLDivElement;
      scrollableMessageMenu.scrollTop = 0;
    }
  }

  const handleSetMessage = async (message: string) => {
    dispatch(setMessage({
      message,
      createdAt: new Date().getTime(),
    }));
  }

  const handleSetGroupMessage = async (groupMessage: string) => {
    dispatch(setGroupMessage({
      message: groupMessage,
      createdAt: new Date().getTime(),
    }));
  }

  return (
    <Box sx={{ px:2, }}>
      <Container
        sx={{ p: 0, height: '75px', maxWidth: '750px !important', display: 'flex', alignItems: 'center', '@media (min-width: 600px)': { p: 0, }, }}
      >
        <Paper
          sx={{
            p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%', height: '50px', borderRadius: '15px',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
          }}
        >
          <IconButton sx={{ p: '5px', ml: '5px' }} aria-label='menu'>
            <InsertEmoticon />
          </IconButton>
          <InputBase
            onKeyDown={handleOnKeyDown}
            id='messageInput'
            name='message'
            autoComplete='nope'
            placeholder='Type a message'
            inputProps={{ 'aria-label': 'type a message' }}
            sx={{ ml: 1, flex: 1, }}
          />
          <IconButton type='button' sx={{ p: '5px', mr: '5px', }} aria-label='attach file'>
            <AttachFile sx={{ transform: 'rotate(45deg)', }} />
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5, }} orientation='vertical' />
          <IconButton color='primary' sx={{ p: '5px', mx: '5px' }} aria-label='voice message'>
            <KeyboardVoice />
          </IconButton>
        </Paper>
      </Container>
    </Box>
  );
}

export default MessageInput;
