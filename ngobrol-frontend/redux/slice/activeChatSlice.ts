import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type ActiveChatType = {
  chatMode: string | 'group' | 'private',
  contactEmail: string,
  groupId: number,
}

export type ActiveChatState = {
  activeChat: ActiveChatType,
}

const initialState: ActiveChatState = {
  activeChat: {
    chatMode: '',
    contactEmail: '',
    groupId: 0,
  },
}

const activeChatSlice = createSlice({
  name: 'activeChat',
  initialState,
  reducers: {
    changeActiveChat: (state, action: PayloadAction<ActiveChatType>) => {
      state.activeChat = action.payload;
    },
  },
});

export const { changeActiveChat } = activeChatSlice.actions;

export default activeChatSlice.reducer;
