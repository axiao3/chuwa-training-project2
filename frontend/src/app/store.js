import { configureStore } from '@reduxjs/toolkit';

import userSlice from './userSlice';
// import errorReducer from './errorSlice';
// import messageReducer from './messageSlice';

export default configureStore({
  reducer: {
    user: userSlice,
    // error: errorReducer,
    // messages: messageReducer
  },
  devTools: true
});
