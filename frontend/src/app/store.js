import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./userSlice";
// import errorReducer from './errorSlice';
import applicationSlice from "./applicationSlice";
import visaSlice from "./visaSlice";

export default configureStore({
  reducer: {
    user: userSlice,
    // error: errorReducer,
    applications: applicationSlice,
    visas: visaSlice
  },
  devTools: true,
});
