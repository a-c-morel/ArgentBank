import { configureStore } from '@reduxjs/toolkit';
import userSliceReducer from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    user : userSliceReducer,
  },
})
