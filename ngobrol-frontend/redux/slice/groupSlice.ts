import {createSlice} from '@reduxjs/toolkit';
import {UserType} from './userSlice';

export type GroupType = {
  groupId: number,
  name: string,
  description: string,
  imageUrl: string,
  userNumber: number,
  users: UserType[],
  createdAt: number,
}

type GroupState = {
  group: GroupType[],
}

const initialState: GroupState = {
  group: [],
}

const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    setInitialGroup: (state, action) => {
      state.group = action.payload;
    },
  },
});

export const { setInitialGroup } = groupSlice.actions;

export default groupSlice.reducer;
