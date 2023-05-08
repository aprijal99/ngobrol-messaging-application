import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type UserType = {
  name: string,
  email: string,
  status: string,
  imageUrl: string,
}

type UserState = {
  user: UserType,
}

const initialState: UserState = {
  user: {
    name: '',
    email: '',
    status: '',
    imageUrl: '',
  },
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    updateUserData: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser, updateUserData } = userSlice.actions;

export default userSlice.reducer;
