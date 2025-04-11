import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.js";

export const getRegionEfficiency = createAsyncThunk(
    "getRegionEfficiency",
    async(date)=>{
        try{
            const [yearCreatedAt, monthCreatedAt, dayCreatedAt] = date.createdAt.split('-');
            const [yearFinishedAt, monthFinishedAt, dayFinishedAt] = date.finishedAt.split('-');

            const formattedDateCreatedAt = `${dayCreatedAt}-${monthCreatedAt}-${yearCreatedAt}`;
            const formattedDateFinishedAt = `${dayFinishedAt}-${monthFinishedAt}-${yearFinishedAt}`;

            const {data: req} = await axiosApi.get(`/v2/efficiency?date_from=${formattedDateCreatedAt}&date_to=${formattedDateFinishedAt}`);

            return req;
        }catch (error){
            throw error;
        }
    });