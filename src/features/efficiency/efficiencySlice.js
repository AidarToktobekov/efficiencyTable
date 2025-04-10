import { createSlice } from '@reduxjs/toolkit';
import {getRegionEfficiency} from "./efficiencyThunk.js";

const initialState = {
    regionEfficiency: [
        {
            region: "Джалал-Абад",
            squares: [
                {
                    square: "Базар-Коргон",
                    data: {
                        efficiency_points: 118,
                        physical_force: 1,
                        works: [
                            {
                                work_type: "Демонтаж",
                                amount: 6
                            },
                            {
                                work_type: "Подключение",
                                amount: 14
                            },
                            {
                                work_type: "Подключение ЮР",
                                amount: 2
                            },
                            {
                                work_type: "Техпод",
                                amount: 41
                            }
                        ],
                        one_day_norm: 3.5,
                        five_day_norm: 17.5
                    }
                },
                {
                    square: "Джалал-Абад верхняя зона",
                    data: {
                        efficiency_points: 75,
                        physical_force: 1,
                        works: [
                            {
                                work_type: "Демонтаж",
                                amount: 3
                            },
                            {
                                work_type: "Подключение",
                                amount: 15
                            },
                            {
                                work_type: "Техпод",
                                amount: 26
                            }
                        ],
                        one_day_norm: 3.5,
                        five_day_norm: 17.5
                    }
                },
            ]
        },
        {
            region: "Иссык-Куль",
            squares: [
                {
                    square: "Ананьево",
                    data: {
                        efficiency_points: 39,
                        physical_force: 2,
                        works: [
                            {
                                work_type: "Демонтаж",
                                amount: 10
                            },
                            {
                                work_type: "Подключение",
                                amount: 4
                            },
                            {
                                work_type: "Техпод",
                                amount: 27
                            }
                        ],
                        one_day_norm: 3.5,
                        five_day_norm: 17.5
                    }
                },
            ]
        },
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
