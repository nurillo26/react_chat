import { createSlice } from '@reduxjs/toolkit';
import { getUserFromLS } from '../utils/getUserFromLC';

export interface LoggedInUser {
  displayName: string;
  email: string;
  photoURL: string | null;
  uid: string;
}

export interface IUserDataSlice {
  loggedInUser: LoggedInUser;
}

const initialState: IUserDataSlice = {
  loggedInUser: getUserFromLS(),
};

export const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setLoggedInUser: (state, action) => {
      state.loggedInUser = action.payload;
    },
  },
});

export const { setLoggedInUser } = userDataSlice.actions;

export default userDataSlice.reducer;
