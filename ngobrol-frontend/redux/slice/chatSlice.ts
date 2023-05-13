import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type ChatProps = {
  message: string,
  fileUrl: string,
  createdAt: number,
  contactOrGroupName: string,
  imageUrl: string,
}

export type ChatType = {
  [n: string | number] : ChatProps,
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
      } else {
        state.chat[action.payload.email] = {
          message: action.payload.message.message,
          fileUrl: action.payload.message.fileUrl,
          createdAt: action.payload.message.createdAt,
          contactOrGroupName: '',
          imageUrl: '',
        }
      }
    },
    changeOneCurrentGroupChat: (state: ChatState, action) => {
      let chatByGroupId = state.chat[action.payload.groupId];
      if(chatByGroupId) {
        chatByGroupId.message = action.payload.groupMessage.message;
        chatByGroupId.fileUrl = action.payload.groupMessage.fileUrl;
        chatByGroupId.createdAt = action.payload.groupMessage.createdAt;

        state.chat[action.payload.groupId] = chatByGroupId;
      } else {
        state.chat[action.payload.groupId] = {
          message: action.payload.groupMessage.message,
          fileUrl: action.payload.groupMessage.fileUrl,
          createdAt: action.payload.groupMessage.createdAt,
          contactOrGroupName: '',
          imageUrl: '',
        }
      }
    },
    updateImageUrl: (state, action: PayloadAction<{ groupId: number, imageUrl: string, }>) => {
      let chatByGroupId = state.chat[action.payload.groupId];
      if(chatByGroupId) chatByGroupId.imageUrl = action.payload.imageUrl;
    },
    deleteChat: (state, action: PayloadAction<{ groupId: number, }>) => {
      let tempChat = state.chat;
      delete tempChat[action.payload.groupId];

      state.chat = tempChat;
    }
  },
});

export const { setInitialChat, changeOneCurrentPrivateChat, changeOneCurrentGroupChat, updateImageUrl, deleteChat } = chatSlice.actions;

export default chatSlice.reducer;
