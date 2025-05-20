import { createSlice } from '@reduxjs/toolkit';
import {getRegionEfficiency} from "./efficiencyThunk.js";

const initialState = {
    regionEfficiency: {
        date: 0,
        data: []
    },
    regionEfficiencyLoading: false,
    regionEfficiencyError: null,
};

const EfficiencySlice = createSlice({
    name: 'efficiency',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getRegionEfficiency.pending, (state) => {
            state.regionEfficiencyLoading = true;
        });
        builder.addCase(getRegionEfficiency.fulfilled, (state, { payload: res }) => {
            state.regionEfficiency = res;
            state.regionEfficiencyLoading = false;
        });
        builder.addCase(getRegionEfficiency.rejected, (state, {payload: error}) => {
            state.regionEfficiencyError = error;
            state.regionEfficiencyLoading = false;
        });
    },
});

export const efficiencyReducer = EfficiencySlice.reducer;
