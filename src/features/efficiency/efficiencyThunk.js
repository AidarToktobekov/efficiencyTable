import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.js";

export const getRegionEfficiency = createAsyncThunk(
    "getRegionEfficiency",
    async(date)=>{
        try{
            const {data: req} = await axiosApi.get(`/regionEfficiency/created_at=${date.createdAt},${date.finishedAt}`);

            return req.data;
        }catch (error){
            throw error;
        }
    });