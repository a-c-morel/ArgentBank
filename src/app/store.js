import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'

/*This project uses Redux Toolkit. See more at https://redux-toolkit.js.org/ */

const store = configureStore({
  reducer: {
    auth : authReducer
  },
})

export default store