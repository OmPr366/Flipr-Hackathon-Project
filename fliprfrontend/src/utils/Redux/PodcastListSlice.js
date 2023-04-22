import { createSlice } from "@reduxjs/toolkit";

const PodcastListSlice = createSlice({
    name: "Podcast",
    initialState: null,
    reducers: {
        setPodcastList: (state, action) => {
            return action.payload
        },

    }
});


export const { setPodcastList } = PodcastListSlice.actions;

export default PodcastListSlice.reducer;

