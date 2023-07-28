/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { removeError, addError } from "./errorSlice";
import {
  signIn,
  signUp,
  logOut,
  generateToken,
  isTokenValid,
} from "../services/auth";

const initialState = {
  isAuthenticated: false,
  user: {},
  status: "idle",
};

export const generateTokenAction = createAsyncThunk(
  "user/generateToken",
  async (data, thunkAPI) => {
    try {
      const { email } = data;
      const tokenRes = await generateToken(email);
      // thunkAPI.dispatch(removeError());
      return tokenRes;
    } catch (error) {
      const { message } = error;
      // thunkAPI.dispatch(addError(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// export const tokenValidationAction = createAsyncThunk(
//   "user/tokenValidation",
//   async (data, thunkAPI) => {
//     try {
//       const { token } = data;
//       const tokenValidationRes = await isTokenValid(token);
//       // thunkAPI.dispatch(removeError());
//       return tokenValidationRes;
//     } catch (error) {
//       const { message } = error;
//       // thunkAPI.dispatch(addError(message));
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

export const signUpAction = createAsyncThunk(
  "user/signUp",
  async (data, thunkAPI) => {
    try {
      const { token, email, password, username } = data;
      const user = await signUp(token, email, password, username);
      // thunkAPI.dispatch(removeError());
      return user;
    } catch (error) {
      console.log("fetched error in slice: ", error.message);
      const { message } = error;
      // thunkAPI.dispatch(addError(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const signInAction = createAsyncThunk(
  "user/signIn",
  async (data, thunkAPI) => {
    try {
      const { username, password } = data;
      const user = await signIn(username, password);

      if (user.username && user.token) localStorage.setItem("token", user.token);

      // thunkAPI.dispatch(removeError());
      console.log("sign in in user slice: ", user);
      return user;
    } catch (error) {
      const { message } = error;
      // thunkAPI.dispatch(addError(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.isAuthenticated = !!Object.keys(action.payload).length;
      state.user = action.payload;
    },
    logOutUser: (state, action) => {
      state.isAuthenticated = false;
      state.user = {};
      state.status = "idle";
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(generateTokenAction.fulfilled, (state, action) => {
      state.status = "Generate Token succeeded";
    });
    builder.addCase(generateTokenAction.rejected, (state, action) => {
      state.status = action.payload; //error message
    });
    builder.addCase(generateTokenAction.pending, (state, action) => {
      state.status = "Generate Token pending";
    });
    // builder.addCase(tokenValidationAction.fulfilled, (state, action) => {
    //   state.status = "Token Validation succeeded";
    // });
    // builder.addCase(tokenValidationAction.rejected, (state, action) => {
    //   state.status = action.payload; //error message
    // });
    // builder.addCase(tokenValidationAction.pending, (state, action) => {
    //   state.status = "Token Validation pending";
    // });
    builder.addCase(signUpAction.fulfilled, (state, action) => {
      state.status = "Sign up succeeded";
    });
    builder.addCase(signUpAction.rejected, (state, action) => {
      console.log("action got reject: ", action.payload);
      state.status = action.payload; //error message
    });
    builder.addCase(signUpAction.pending, (state, action) => {
      state.status = "Sign up pending";
    });
    builder.addCase(signInAction.fulfilled, (state, action) => {
      state.isAuthenticated = !!Object.keys(action.payload).length;
      state.user = action.payload;
      state.status = "Sign in succeeded";
    });
    builder.addCase(signInAction.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.user = {};
      state.status = action.payload;
    });
    builder.addCase(signInAction.pending, (state, action) => {
      state.status = "Sign in pending";
    });
  },
});

export const { setCurrentUser, logOutUser } = userSlice.actions;
export default userSlice.reducer;
