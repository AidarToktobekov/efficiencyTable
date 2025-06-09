import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.js';
import { isAxiosError } from 'axios';

export const getRegionEfficiency = createAsyncThunk(
  'getRegionEfficiency',
  async ({ date, square }, { rejectWithValue }) => {
    try {
      const formattedDateCreatedAt = date[0].format('DD-MM-YYYY');
      const formattedDateFinishedAt = date[1].format('DD-MM-YYYY');
      const { data: req } = await axiosApi.get(
        `/v2/efficiency/?date_from=${formattedDateCreatedAt}&date_to=${formattedDateFinishedAt}${!!square ? `&square_id=${square}` : ''}`
      );

      return req;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data);
      }
      throw new Error(e);
    }
  }
);

export const getSquares = createAsyncThunk('getSquares', async () => {
  try {
    const { data: req } = await axiosApi.get('accounts/squares/');

    return req;
  } catch (e) {
    throw new Error(e);
  }
});
