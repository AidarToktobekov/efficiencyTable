import {createAsyncThunk} from '@reduxjs/toolkit';
import axios, {isAxiosError} from "axios";

export const login = createAsyncThunk(
  'user/login',
  async (user, { rejectWithValue }) => {
    try {
        const { data: req } = await axios.post('https://pp.skynet.kg/api/accounts/token/', {
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