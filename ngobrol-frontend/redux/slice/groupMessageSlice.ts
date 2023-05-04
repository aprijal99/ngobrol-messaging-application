import {createSlice} from '@reduxjs/toolkit';

export type GroupMessageType = {
  message: string,
  fileUrl: string,
  createdAt: number,
  senderEmail: string,
  senderName: string,
  imageUrl: string,
  groupId: number,
}

type GroupMessageState = {
  groupMessage: { [n: number]: GroupMessageType[], }
}

const initialState: GroupMessageState = {
  groupMessage: {
    0: [
      {
        message: 'lorem ipsum',
        fileUrl: 'lorem ipsum',
        createdAt: 0,
        senderEmail: 'lorem ipsum',
        senderName: 'lorem ipsum',
        imageUrl: 'lorem ipsum',
        groupId: 0,
      },
    ],
  },
}

const groupMessageSlice = createSlice({
  name: 'groupMessage',
  initialState,
  reducers: {
    setInitialGroupMessage: (state: GroupMessageState, action) => {
      state.groupMessage[action.payload.groupId] = action.payload.groupMessage;
    },
    addIncomingGroupMessage: (state: GroupMessageState, action) => {
      let groupMessageById: GroupMessageType[] = state.groupMessage[action.payload.groupId];
      if(groupMessageById) {
        groupMessageById.unshift(action.payload.groupMessage);
        state.groupMessage[action.payload.groupId] = groupMessageById;
      }
    },
  },
});

export const { setInitialGroupMessage, addIncomingGroupMessage } = groupMessageSlice.actions;

export default groupMessageSlice.reducer;
