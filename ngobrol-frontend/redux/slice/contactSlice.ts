import {createSlice} from '@reduxjs/toolkit';
import {UserType} from './userSlice';

type ContactState = {
  contact: UserType[],
}

const initialState: ContactState = {
  contact: [],
}

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    setInitialContact: (state, action) => {
      state.contact = action.payload;
    }
  },
});

export const { setInitialContact } = contactSlice.actions;

export default contactSlice.reducer;
