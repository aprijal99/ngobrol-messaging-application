import MainMenuTitle from './MainMenuTitle';
import SearchBar from './SearchBar';
import ScrollableContainer from '../ScrollableContainer';
import ChatList from './ChatList';
import {LibraryAddOutlined, PeopleAltOutlined, PersonOutlineOutlined} from '@mui/icons-material';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../redux/store/store';
import {CircularProgress, IconButton, ListItemIcon, Menu, MenuItem} from '@mui/material';
import React, {useState} from 'react';
import {changeActiveMenu} from '../../../redux/slice/menuSlice';

const ChatListIteration = () => {
  const { chat } = useSelector((state: RootState) => state.chat);

  let keys: any[] = [];
  Object.keys(chat).forEach(key => keys.push([ key, chat[key].createdAt, ]));
  keys = keys.sort((x,y) => y[1] - x[1]).map(val => val[0]);

  return (
    <>
      {chat['lorem@ipsum.com'] !== undefined ? <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translateX(-50%) translateY(-50%)' }}>
        <CircularProgress />
      </div> : keys.map(chatId => <ChatList
        key={chatId}
        chatId={chatId}
        chat={chat[chatId]}
      />)}
    </>
  );
}

const NewChatButton = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);

  return (
    <>
      <IconButton onClick={handleClick} sx={{ cursor: 'pointer', }}>
        <LibraryAddOutlined />
      </IconButton>
      <Menu
        id='add-chat-menu' anchorEl={anchorEl} open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}
        transformOrigin={{ vertical: 'top', horizontal: 'right', }}
        sx={{ top: '5px', left: '-5px', }}
      >
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            dispatch(changeActiveMenu('contact'));
          }}
          sx={{ minHeight: 'initial', fontSize: '.9rem', fontWeight: 'medium', }}
        >
          <ListItemIcon>
            <PersonOutlineOutlined fontSize='small' />
          </ListItemIcon>
          New Private Chat
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            dispatch(changeActiveMenu('group'));
          }}
          sx={{ minHeight: 'initial', fontSize: '.9rem', fontWeight: 'medium', }}
        >
          <ListItemIcon>
            <PeopleAltOutlined fontSize='small' />
          </ListItemIcon>
          New Group Chat
        </MenuItem>
      </Menu>
    </>
  );
}

const Chat = () => {
  return (
    <>
      <MainMenuTitle title='Chats' addIcon={<NewChatButton />} />
      <SearchBar placeholder='Search or start a new chat' />
      <ScrollableContainer reducedHeight='130px'>
        <ChatListIteration />
      </ScrollableContainer>
    </>
  );
}

export default Chat;
