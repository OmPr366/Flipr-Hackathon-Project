import { createSlice } from "@reduxjs/toolkit";

const CsvDataSlice =  createSlice({
    name: "CsvData",
    initialState: [],
    reducers: {
        setCsvData: (state, action) => {
            return action.payload
        },
            
    }
});


export const {setCsvData} = CsvDataSlice.actions;

export default CsvDataSlice.reducer;

