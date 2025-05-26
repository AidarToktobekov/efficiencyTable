import { createSlice } from '@reduxjs/toolkit';
import { login } from './userThunk';

const initialState = {
  user: {
    username: 'aidar',
    name: 'Aidar',
    role: 'admin',
    sip: 90,
    phone_number: '3231',
    token: '213',
  },
  loginLoading: false,
  loginError: null,
};

const UsersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loginLoading = true;
      state.loginError = null;
    });
    builder.addCase(login.fulfilled, (state, { payload: res }) => {
      state.user = {
        id: res.id,
        username: res.username,
        full_name: res.full_name,
        role: res.role,
        square_ids: res.square_ids,
        token: res.access,
        refresh: res.refresh,
      };
      state.loginLoading = false;
    });
    builder.addCase(login.rejected, (state, { payload: error }) => {
      state.loginError = error;
      state.loginLoading = false;
    });
  },
  selectors: {
    selectUser: (state) => state.user,
    selectLoginLoading: (state) => state.loginLoading,
    selectLoginError: (state) => state.loginError,
  },
});

export const userReducer = UsersSlice.reducer;
export const { selectUser, selectLoginLoading, selectLoginError } =
  UsersSlice.selectors;
export const { logout } = UsersSlice.actions;
