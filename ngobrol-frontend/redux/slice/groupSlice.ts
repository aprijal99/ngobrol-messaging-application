import {createSlice, PayloadAction} from '@reduxjs/toolkit';
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
    addGroup: (state, action: PayloadAction<GroupType>) => {
      state.group = [...state.group, action.payload];
    },
    changeGroupUsers: (state, action: PayloadAction<{ groupId: number, users: UserType[], }>) => {
      const groupById = state.group.filter(g => g.groupId === action.payload.groupId)[0];
      if(groupById) {
        groupById.users = action.payload.users;
        groupById.userNumber = action.payload.users.length;
      }
    },
  },
});

export const { setInitialGroup, addGroup, changeGroupUsers } = groupSlice.actions;

export default groupSlice.reducer;
