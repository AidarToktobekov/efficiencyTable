import { createSlice } from '@reduxjs/toolkit';
import {getRegionEfficiency} from "./efficiencyThunk.js";

const initialState = {
    regionEfficiency: [],
    regionEfficiencyLoading: false,
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
        builder.addCase(getRegionEfficiency.rejected, (state) => {
            state.regionEfficiencyLoading = false;
        });
    },
    selectors: {
        selectRegionEfficiency: (state) => state.regionEfficiency,
        selectRegionEfficiencyLoading: (state) => state.regionEfficiencyLoading,
    }
});

export const efficiencyReducer = EfficiencySlice.reducer;
export const {
    selectRegionEfficiency,
    selectRegionEfficiencyLoading,
} = EfficiencySlice.selectors;
