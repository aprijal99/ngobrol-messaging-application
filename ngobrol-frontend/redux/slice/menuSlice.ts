import {createSlice} from '@reduxjs/toolkit';

type ActiveMenuState = {
  activeMenu: 'chat' | 'contact' | 'group',
}

const initialState: ActiveMenuState = {
  activeMenu: 'chat',
}

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    changeActiveMenu: (state, action) => {
      state.activeMenu = action.payload;
    },
  },
});

export const { changeActiveMenu } = menuSlice.actions;

export default menuSlice.reducer;
