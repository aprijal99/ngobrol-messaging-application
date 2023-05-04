import {MessageType} from './messageSlice';
import {createSlice} from '@reduxjs/toolkit';
import {GroupMessageType} from './groupMessageSlice';

type SentMessageState = {
  sentMessage: MessageType,
  sentGroupMessage: GroupMessageType,
}

const initialState: SentMessageState = {
  sentMessage: {
    message: '',
    fileUrl: '',
    createdAt: 0,
    senderEmail: '',
    receiverEmail: '',
  },
  sentGroupMessage: {
    message: '',
    fileUrl: '',
    createdAt: 0,
    senderEmail: '',
    senderName: '',
    imageUrl: '',
    groupId: 0,
  },
}

const sentMessageSlice = createSlice({
  name: 'sentMessage',
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.sentMessage.message = action.payload.message;
      state.sentMessage.createdAt = action.payload.createdAt;
    },
    setSenderEmail: (state, action) => {
      state.sentMessage.senderEmail = action.payload;
      state.sentGroupMessage.senderEmail = action.payload;
    },
    setReceiverEmail: (state, action) => {
      state.sentMessage.receiverEmail = action.payload;
    },
    setGroupMessage: (state, action) => {
      state.sentGroupMessage.message = action.payload.message;
      state.sentGroupMessage.createdAt = action.payload.createdAt;
    },
    setGroupId: (state, action) => {
      state.sentGroupMessage.groupId = action.payload;
    },
  },
});

export const { setMessage, setSenderEmail, setReceiverEmail, setGroupMessage, setGroupId } = sentMessageSlice.actions;

export default sentMessageSlice.reducer;
