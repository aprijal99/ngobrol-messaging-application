import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../slice/userSlice';
import menuReducer from '../slice/menuSlice';
import chatReducer from '../slice/chatSlice';
import contactReducer from '../slice/contactSlice';
import groupReducer from '../slice/groupSlice';
import activeChatReducer from '../slice/activeChatSlice';
import messageReducer from '../slice/messageSlice';
import groupMessageReducer from '../slice/groupMessageSlice';
import sentMessageReducer from '../slice/sentMessageSlice';

export const makeStore = () => configureStore({
  reducer: {
    user: userReducer,
    menu: menuReducer,
    chat: chatReducer,
    contact: contactReducer,
    group: groupReducer,
    activeChat: activeChatReducer,
    message: messageReducer,
    groupMessage: groupMessageReducer,
    sentMessage: sentMessageReducer,
  },
});

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
