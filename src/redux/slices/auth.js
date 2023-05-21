/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { login } from '../../utils/https/auth';

const initialState = {
  // isLogin: false,
  id: null,
  name: null,
  email: null,
  image: null,
  address: null,
  phone: null,
  role_id: null,
  token: null,
  data: null,
  isLoading: false,
  isRejected: false,
  isFulfilled: false,
  err: null,
};

const loginThunk = createAsyncThunk(
  'user/post',
  async ({ email, password }, controller) => {
    try {
      const response = await login(email, password, controller);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authLogin: (prevState, action) => {
      return {
        ...prevState,
        // isLogin: true,
        id: action.payload.id,
        // image: action.payload.dataUser.profile_picture,
        role_id: action.payload.role_id,
        token: action.payload.token,
      };
    },
    dataUser: (prevState, action) => {
      return {
        ...prevState,
        name: action.payload.name,
        email: action.payload.email,
        image: action.payload.image,
        address: action.payload.address,
        phone: action.payload.phone,
      };
    },
    updateImage: (prevState, action) => {
      return {
        ...prevState,
        data: {
          ...prevState.data,
          profile_picture: action.payload,
        },
      };
    },
    updateAddress: (prevState, action) => {
      console.log(action.payload);
      return {
        ...prevState,
        data: {
          ...prevState.data,
          address: action.payload,
        },
      };
    },
    updatePhone: (prevState, action) => {
      console.log(action.payload);
      return {
        ...prevState,
        data: {
          ...prevState.data,
          phone: action.payload,
        },
      };
    },
    authLogout: () => {
      return initialState.token;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true;
        state.isRejected = false;
        state.isFulfilled = false;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isFulfilled = true;
        state.token = action.payload.token || null;
        state.data = action.payload.dataUser || null;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isRejected = true;
        state.err = action.payload;
      });
  },
});

export const userAction = { ...userSlice.actions, loginThunk };
export default userSlice.reducer;
