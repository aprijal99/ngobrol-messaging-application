import {createSlice} from '@reduxjs/toolkit';

export type MessageType = {
  message: string,
  fileUrl: string,
  createdAt: number,
  senderEmail: string,
  receiverEmail: string,
}

type MessageState = {
  message: { [n: string]: MessageType[], },
}

const initialState: MessageState = {
  message: {
    'lorem@ipsum.com': [
      {
        message: 'lorem ipsum',
        fileUrl: 'lorem ipsum',
        createdAt: 0,
        senderEmail: 'lorem ipsum',
        receiverEmail: 'lorem ipsum',
      },
    ],
  },
}

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setInitialMessage: (state: MessageState, action) => {
      state.message[action.payload.email] = action.payload.message;
    },
    addIncomingMessage: (state: MessageState, action) => {
      let messageByEmail: MessageType[] = state.message[action.payload.email];
      if(messageByEmail) {
        messageByEmail.unshift(action.payload.message);
        state.message[action.payload.email] = messageByEmail;
      }
    },
  },
});

export const { setInitialMessage, addIncomingMessage } = messageSlice.actions;

export default messageSlice.reducer;
