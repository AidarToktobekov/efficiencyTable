import { createSlice } from '@reduxjs/toolkit';
import {getRegionEfficiency} from "./efficiencyThunk.js";

const initialState = {
    regionEfficiency: [
        {
            pS: '2',
            oneDay: "3,5",
            week: "17.5",
            TP: '19',
            AVR: "2",
            dismantling: '10',
            region: 'Чуй',
            square: "Юг",
            build: '1',
            connection: "15",
            sale: '5',
            point: '14',
            efficiency: 85,
        }
    ],
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
