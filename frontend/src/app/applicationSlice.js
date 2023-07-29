/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApplication } from "../services/application";
// import { removeError, addError } from "./errorSlice";

const initialState = {
  applications: [],
  status: "idle",
};

// export const fetchApplicationAction = createAsyncThunk(
//     "application/fetchApplication",
//     async (data, thunkAPI) => {
//       try {
//         const messages = await fetchMessages(data);
//         thunkAPI.dispatch(removeError());
//         return messages;
//       } catch (error) {
//         const { message } = error;
//         thunkAPI.dispatch(addError(message));
//         return thunkAPI.rejectWithValue(message);
//       }
//     }
//   );

export const createApplicationAction = createAsyncThunk(
  "application/createApplication",
  async (data, thunkAPI) => {
    try {
      const application = await createApplication(data);
      return application;
    } catch (error) {
      const { message } = error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const applicationSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {
    // loadMessages: (state, action) => {
    //   state.status = 'pending';
    //   state.messages = action.payload;
    // }
  },
  extraReducers: (builder) => {
    builder.addCase(createApplicationAction.fulfilled, (state, action) => {
      state.status = "create application succeeded";
      state.applications.push(action.payload);
    });
    builder.addCase(createApplicationAction.rejected, (state, action) => {
      state.status = "create application failed";
    });
    builder.addCase(createApplicationAction.pending, (state, action) => {
      state.status = "create application pending";
    });
  },
});

export default applicationSlice.reducer;
