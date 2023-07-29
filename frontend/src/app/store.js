import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./userSlice";
// import errorReducer from './errorSlice';
import applicationSlice from "./applicationSlice";

export default configureStore({
  reducer: {
    user: userSlice,
    // error: errorReducer,
    applications: applicationSlice
  },
  devTools: true,
});
