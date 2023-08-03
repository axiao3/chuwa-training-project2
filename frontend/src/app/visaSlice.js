/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getVisasInProgress,
  updateApplicationById,
  sendEmail,
} from "../services/visas";

const initialState = {
  visas: [],
  status: "idle",
};

export const getVisaInProgressAction = createAsyncThunk(
  "application/getVisaInProgressAction",
  async (data, thunkAPI) => {
    try {
      const visasInProgress = await getVisasInProgress();
      return visasInProgress;
    } catch (error) {
      const { message } = error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateApplicationAction = createAsyncThunk(
  "application/updateApplication",
  async (data, thunkAPI) => {
    try {
      console.log("id: ", data.user);
      console.log("data: ", data);
      const application = await updateApplicationById(data.user, data);
      return application;
    } catch (error) {
      const { message } = error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const sendNotificationAction = createAsyncThunk(
  "application/sendNotificationAction",
  async (data, thunkAPI) => {
    try {
      console.log("data:", data);
      const application = await sendEmail(data.email, data.type);
      return application;
    } catch (error) {
      const { message } = error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const visaSlice = createSlice({
  name: "visas",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getVisaInProgressAction.fulfilled, (state, action) => {
      state.status = "visaInProgress application succeeded";
      state.visas = action.payload;
    });
    builder.addCase(getVisaInProgressAction.rejected, (state, action) => {
      state.status = "visaInProgress application failed";
    });
    builder.addCase(getVisaInProgressAction.pending, (state, action) => {
      state.status = "visaInProgress application pending";
    });
    builder.addCase(updateApplicationAction.fulfilled, (state, action) => {
      state.status = "update application succeeded";
      //   state.applications = [action.payload];
    });
    builder.addCase(updateApplicationAction.rejected, (state, action) => {
      state.status = "update application failed";
    });
    builder.addCase(updateApplicationAction.pending, (state, action) => {
      state.status = "update application pending";
    });
    builder.addCase(sendNotificationAction.fulfilled, (state, action) => {
      state.status = "send notification succeeded";
    });
    builder.addCase(sendNotificationAction.rejected, (state, action) => {
      state.status = "send notification failed";
    });
    builder.addCase(sendNotificationAction.pending, (state, action) => {
      state.status = "send notification pending";
    });
  },
});

export default visaSlice.reducer;
