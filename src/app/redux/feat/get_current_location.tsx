'use client';

import {createSlice} from "@reduxjs/toolkit";

export interface currentLocation {
    location: object
}

const initialState: currentLocation = {
    location: {
        lat: 13.7248785,
        lng: 100.4682977
    }
}

export const currentLocationSlice = createSlice({
    name: "currentLocation",
    initialState,
    reducers: {
        addNewLatLng: (state, action) => {
            state.location = action.payload
        },
    }
})

export const {addNewLatLng} = currentLocationSlice.actions;
export default currentLocationSlice.reducer