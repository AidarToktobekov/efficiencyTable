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

            console.log(formattedDateCreatedAt, formattedDateFinishedAt);
            const {data: req} = await axiosApi.get(`/efficiency?date_from=${formattedDateCreatedAt}&date_to=${formattedDateFinishedAt}`);

            return req;
        }catch (error){
            throw error;
        }
    });