import {createAsyncThunk} from '@reduxjs/toolkit';
import {isAxiosError} from "axios";
import axiosApi from "../../axiosApi.js";

export const login = createAsyncThunk(
  'user/login',
  async (user, { rejectWithValue }) => {
    try {
        const { data: req } = await axiosApi.post('/accounts/token/', {
            username: user.username,
            password: user.password
        });
      return req;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 401) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);