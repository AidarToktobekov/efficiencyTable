import { createSlice } from '@reduxjs/toolkit';
import { getRegionEfficiency, getSquares } from './efficiencyThunk.js';

const initialState = {
  regionEfficiency: {
    date: 0,
    data: [],
  },
  regionEfficiencyLoading: false,
  regionEfficiencyError: null,
  squares: [],
  squaresLoading: false,
};

const EfficiencySlice = createSlice({
  name: 'efficiency',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRegionEfficiency.pending, (state) => {
      state.regionEfficiencyError = null;
      state.regionEfficiencyLoading = true;
    });
    builder.addCase(
      getRegionEfficiency.fulfilled,
      (state, { payload: res }) => {
        state.regionEfficiency = {
          date: res.request_days,
          data: res.data,
        };
        if (res.data.length < 1) {
          state.regionEfficiencyError = {
            status: 'warning',
            message: 'Нет данных!',
          };
        }
        state.regionEfficiencyLoading = false;
      }
    );
    builder.addCase(
      getRegionEfficiency.rejected,
      (state, { payload: error }) => {
        state.regionEfficiencyError = {
          ...error,
          status: 'error',
        };
        state.regionEfficiencyLoading = false;
      }
    );

    builder.addCase(getSquares.pending, (state) => {
      state.squaresLoading = true;
    });
    builder.addCase(getSquares.fulfilled, (state, { payload: res }) => {
      state.squares = res;
      state.squaresLoading = false;
    });
    builder.addCase(getSquares.rejected, (state) => {
      state.squaresLoading = false;
    });
  },
});

export const efficiencyReducer = EfficiencySlice.reducer;
