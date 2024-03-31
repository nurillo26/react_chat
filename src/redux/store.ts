import { configureStore } from '@reduxjs/toolkit';
import userData from './userDataSlice';
import chatSlise from './chatSlise';

export const store = configureStore({
  reducer: {
    userData,
    chatSlise,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
