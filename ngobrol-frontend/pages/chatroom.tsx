import SockJS from 'sockjs-client';
import {Client, Message, over} from 'stompjs';
import {useEffect} from 'react';
import {Box} from '@mui/material';
import {GetServerSideProps} from 'next';
import {AccessTokenType} from '../types/token';
import jwtDecode from 'jwt-decode';
import redirectToPage from '../functions/redirectToPage';
import fetchContact from '../functions/fetchContact';
import fetchChat from '../functions/fetchChat';
import MainMenu from '../components/chatroom/MainMenu';
import {useDispatch, useSelector, useStore} from 'react-redux';
import {AppDispatch, RootState} from '../redux/store/store';
import {
  changeOneCurrentGroupChat,
  changeOneCurrentPrivateChat,
  deleteChat,
  setInitialChat
} from '../redux/slice/chatSlice';
import {addContact, deleteContact, setInitialContact} from '../redux/slice/contactSlice';
import LeftMenu from '../components/chatroom/LeftMenu';
import MessageMenu from '../components/chatroom/MessageMenu';
import fetchUserData from '../functions/fetchUserData';
import {setUser} from '../redux/slice/userSlice';
import cookie from 'cookie';
import {setSenderEmail} from '../redux/slice/sentMessageSlice';
import {addIncomingMessage, deleteContactMessage, MessageType} from '../redux/slice/messageSlice';
import fetchGroup from '../functions/fetchGroup';
import {addGroup, addUserToGroup, setInitialGroup} from '../redux/slice/groupSlice';
import {addIncomingGroupMessage, GroupMessageType} from '../redux/slice/groupMessageSlice';
import ProfileDetail from '../components/chatroom/messages_menu/ProfileDetail';
import UserDetail from '../components/chatroom/left_menu/UserDetail';
import findGroup from '../functions/findGroup';
import {changeActiveChat} from '../redux/slice/activeChatSlice';
import {resetActiveChat} from '../functions/activeChat';

type HomeProps = { userEmail: string, }

export let stompClient: Client;
const Sock: WebSocket = new SockJS('http://localhost:7080/websocket');
stompClient = over(Sock);

const Home = ({ userEmail }: HomeProps) => {
  const { activeChat: { chatMode } } = useSelector((state: RootState) => state.activeChat, (oldVal, newVal) => {
    if(oldVal.activeChat.chatMode === '' && newVal.activeChat.chatMode !== '') return false;
    return !(oldVal.activeChat.chatMode !== '' && newVal.activeChat.chatMode === '');
  });

  const dispatch = useDispatch<AppDispatch>();
  const store = useStore<RootState>();

  useEffect(() => {
    const initialFetching = async () => {
      await fetchUserData(userEmail).then(userData => dispatch(setUser(userData)));
      await fetchContact(userEmail).then(contactList => dispatch(setInitialContact(contactList)));
      await fetchChat(userEmail).then(chatList => dispatch(setInitialChat(chatList)));
      await fetchGroup(userEmail).then(groupList => dispatch(setInitialGroup(groupList)));
    }

    initialFetching().then(() => dispatch(setSenderEmail(userEmail))).catch(reason => console.log(reason.message));
  }, []);

  const connectToWebsocket = () => {
    stompClient.connect({}, onSuccess);
    stompClient.heartbeat.outgoing = 0;
    stompClient.heartbeat.incoming = 0;
  }

  const onSuccess = () => {
    stompClient.subscribe(`/topic/${userEmail}`, (payload: Message) => {
      const message: MessageType = JSON.parse(payload.body);

      if(message.message === '') {
        const payloadHeaders = payload.headers as { messageType: string, };

        if(payloadHeaders.messageType === 'new-contact') {
          fetchUserData(message.senderEmail).then(userData => dispatch(addContact(userData)));
        } else if(payloadHeaders.messageType === 'delete-contact') {
          if(store.getState().activeChat.activeChat.contactEmail === message.senderEmail) {
            dispatch(changeActiveChat(resetActiveChat()));
            const messageMenu = document.getElementById('message-menu');
            if(messageMenu) {
              messageMenu.style.marginRight = '0px';
              messageMenu.classList.remove('left-0');
            }
          }

          dispatch(deleteContact({ contactEmail: message.senderEmail, }));
          dispatch(deleteChat({ chatId: message.senderEmail, }));
          dispatch(deleteContactMessage({ contactEmail: message.senderEmail, }));
        }

        return;
      }

      dispatch(addIncomingMessage({ email: message.senderEmail, message: message, }));
      dispatch(changeOneCurrentPrivateChat({ email: message.senderEmail, message: message, }));
    });

    stompClient.subscribe(`/topic/${userEmail}-group`, (payload: Message) => {
      const groupMessage: GroupMessageType = JSON.parse(payload.body);

      if(groupMessage.message === '') {
        const payloadHeaders = payload.headers as { messageType: string, };

        if(payloadHeaders.messageType === 'new-group') {
          findGroup(`${groupMessage.groupId}`)
            .then(result => {
              if(!(result instanceof Error)) {
                dispatch(addGroup(result));
              }
            });
        } else if(payloadHeaders.messageType === 'new-member') {
          fetchUserData(groupMessage.senderEmail).then(userData => {
            dispatch(addUserToGroup({ groupId: groupMessage.groupId, user: userData }));
          });
        }

        return;
      }

      dispatch(addIncomingGroupMessage({ groupId: groupMessage.groupId, groupMessage: groupMessage, }));
      dispatch(changeOneCurrentGroupChat({ groupId: groupMessage.groupId, groupMessage: groupMessage, }))
    });
  }

  connectToWebsocket();

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden', position: 'relative', }}>
      <Box
        sx={{
          display: 'grid', gridTemplateColumns: '60px calc(100% - 60px)', minWidth: '100%', width: '100%', overflow: 'hidden', position: 'relative',
          '@media (min-width: 450px)': { gridTemplateColumns: '80px calc(100% - 80px)', },
          '@media (min-width: 620px)': { minWidth: '480px', width: '480px', },
          transition: 'width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms, min-width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
        }}
      >
        {/* Left Menu */}
        <LeftMenu />

        {/* Main Menu */}
        <MainMenu />

        {/* User Detail */}
        <UserDetail />
      </Box>

      {/* MessageList Menu */}
      <MessageMenu />

      {/* Profile Detail */}
      {chatMode !== '' && <ProfileDetail />}
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  if(context.req.method === 'POST') {
    context.res.setHeader('Set-Cookie', [
      cookie.serialize('access_token', '', { maxAge: 0, }),
      cookie.serialize('refresh_token', '', { maxAge: 0, }),
    ]);

    return redirectToPage('login');
  }

  const accessToken: string | undefined = context.req.cookies['access_token'] as string;
  if(accessToken === undefined) return redirectToPage('login');

  const decodedAccessToken: AccessTokenType = jwtDecode(accessToken);
  const isValid: boolean = Date.now() / 1000 < decodedAccessToken.exp;
  if(!isValid) return redirectToPage('login');

  const props: HomeProps = {
    userEmail: decodedAccessToken.sub,
  }

  return {
    props,
  }
}

export default Home;
