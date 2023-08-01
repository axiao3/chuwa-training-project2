/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApplication, updateApplicationById, getAllApplications, getApplicationById } from "../services/application";
// import { removeError, addError } from "./errorSlice";

const initialState = {
  applications: [],
  status: "idle",
};

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

export const getAllApplicationAction = createAsyncThunk(
  "application/getAllApplication",
  async (data, thunkAPI) => {
    try {
      // console.log("id: ", data.user);
      // console.log("data: ", data);
      const applications = await getAllApplications();
      return applications;
    } catch (error) {
      const { message } = error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getApplicationByIdAction = createAsyncThunk(
  "application/getApplicationById",
  async (data, thunkAPI) => {
    try {
      // console.log("data", data);
      const application = await getApplicationById(data.id);
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
      // state.applications.push(action.payload);
    });
    builder.addCase(createApplicationAction.rejected, (state, action) => {
      state.status = "create application failed";
    });
    builder.addCase(createApplicationAction.pending, (state, action) => {
      state.status = "create application pending";
    });
    builder.addCase(updateApplicationAction.fulfilled, (state, action) => {
      state.status = "update application succeeded";
      state.applications = [action.payload];
    });
    builder.addCase(updateApplicationAction.rejected, (state, action) => {
      state.status = "update application failed";
    });
    builder.addCase(updateApplicationAction.pending, (state, action) => {
      state.status = "update application pending";
    });
    builder.addCase(getAllApplicationAction.fulfilled, (state, action) => {
      state.status = "get applications succeeded";
      state.applications = action.payload;
    });
    builder.addCase(getAllApplicationAction.rejected, (state, action) => {
      state.status = "get applications failed";
    });
    builder.addCase(getAllApplicationAction.pending, (state, action) => {
      state.status = "get applications pending";
    });
    builder.addCase(getApplicationByIdAction.fulfilled, (state, action) => {
      state.status = "get application by Id succeeded";
      state.applications = [action.payload];
    });
    builder.addCase(getApplicationByIdAction.rejected, (state, action) => {
      state.status = "get application by Id failed";
    });
    builder.addCase(getApplicationByIdAction.pending, (state, action) => {
      state.status = "get application by Id pending";
    });
  },
});

export default applicationSlice.reducer;
