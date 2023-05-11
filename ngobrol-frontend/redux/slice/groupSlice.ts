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
    updateGroup: (state, action: PayloadAction<{ groupId: number, name: string, description: string, imageUrl: string | null, }>) => {
      const groupById = state.group.filter(g => g.groupId === action.payload.groupId)[0];
      if(groupById) {
        groupById.name = action.payload.name;
        groupById.description = action.payload.description;
        if(action.payload.imageUrl) groupById.imageUrl = action.payload.imageUrl;
      }
    },
    changeGroupUsers: (state, action: PayloadAction<{ groupId: number, users: UserType[], }>) => {
      const groupById = state.group.filter(g => g.groupId === action.payload.groupId)[0];
      if(groupById) {
        groupById.users = action.payload.users;
        groupById.userNumber = action.payload.users.length;
      }
    },
    deleteGroup: (state, action: PayloadAction<{ groupId: number, }>) => {
      state.group = state.group.filter(g => g.groupId !== action.payload.groupId);
    },
  },
});

export const { setInitialGroup, addGroup, updateGroup, changeGroupUsers, deleteGroup } = groupSlice.actions;

export default groupSlice.reducer;
