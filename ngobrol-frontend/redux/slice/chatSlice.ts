import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type ChatType = {
  [n: string | number] : {
    message: string,
    fileUrl: string,
    createdAt: number,
    contactOrGroupName: string,
    imageUrl: string,
  },
}

type ChatState = {
  chat: ChatType,
}

const initialState: ChatState = {
  chat: {
    'lorem@ipsum.com': {
      message: 'lorem ipsum',
      fileUrl: 'lorem ipsum',
      createdAt: 0,
      contactOrGroupName: 'lorem ipsum',
      imageUrl: '',
    },
  },
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setInitialChat: (state: ChatState, action) => {
      state.chat = action.payload;
    },
    changeOneCurrentPrivateChat: (state: ChatState, action) => {
      let chatByEmail = state.chat[action.payload.email];
      if(chatByEmail) {
        chatByEmail.message = action.payload.message.message;
        chatByEmail.fileUrl = action.payload.message.fileUrl;
        chatByEmail.createdAt = action.payload.message.createdAt;

        state.chat[action.payload.email] = chatByEmail;
      }
    },
    changeOneCurrentGroupChat: (state: ChatState, action) => {
      let chatByGroupId = state.chat[action.payload.groupId];
      if(chatByGroupId) {
        chatByGroupId.message = action.payload.groupMessage.message;
        chatByGroupId.fileUrl = action.payload.groupMessage.fileUrl;
        chatByGroupId.createdAt = action.payload.groupMessage.createdAt;

        state.chat[action.payload.groupId] = chatByGroupId;
      }
    },
    updateImageUrl: (state, action: PayloadAction<{ groupId: number, imageUrl: string, }>) => {
      let chatByGroupId = state.chat[action.payload.groupId];
      if(chatByGroupId) chatByGroupId.imageUrl = action.payload.imageUrl;
    },
  },
});

export const { setInitialChat, changeOneCurrentPrivateChat, changeOneCurrentGroupChat, updateImageUrl } = chatSlice.actions;

export default chatSlice.reducer;
