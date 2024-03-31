import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allUsers: [],
  modalIsOpen: false,
  chats: [],
};

export const chatSlise = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setModalIsOpen: (state, action) => {
      state.modalIsOpen = action.payload;
    },
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    setChats: (state, action) => {
      state.chats = action.payload;
    },
  },
});

export const { setModalIsOpen, setAllUsers, setChats } = chatSlise.actions;

export default chatSlise.reducer;
