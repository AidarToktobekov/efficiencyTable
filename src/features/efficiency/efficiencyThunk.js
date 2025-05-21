import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.js";
import {isAxiosError} from "axios";

export const getRegionEfficiency = createAsyncThunk(
    "getRegionEfficiency",
    async(date, {rejectWithValue})=>{
        try{
            const [yearCreatedAt, monthCreatedAt, dayCreatedAt] = date.createdAt.split('-');
            const [yearFinishedAt, monthFinishedAt, dayFinishedAt] = date.finishedAt.split('-');

            const formattedDateCreatedAt = `${dayCreatedAt}-${monthCreatedAt}-${yearCreatedAt}`;
            const formattedDateFinishedAt = `${dayFinishedAt}-${monthFinishedAt}-${yearFinishedAt}`;

            const {data: req} = await axiosApi.get(`/v2/efficiency/?date_from=${formattedDateCreatedAt}&date_to=${formattedDateFinishedAt}`);

            return req;
        }catch (e){
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data);
            }
            throw new Error(e);
        }
    });