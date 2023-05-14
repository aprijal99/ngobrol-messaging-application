import {createSlice, PayloadAction} from '@reduxjs/toolkit';
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
    },
    addContact: (state, action: PayloadAction<UserType>) => {
      state.contact = [...state.contact, action.payload];
    },
    deleteContact: (state, action: PayloadAction<{ contactEmail: string, }>) => {
      state.contact = state.contact.filter(c => c.email !== action.payload.contactEmail);
    },
  },
});

export const { setInitialContact, addContact, deleteContact } = contactSlice.actions;

export default contactSlice.reducer;
