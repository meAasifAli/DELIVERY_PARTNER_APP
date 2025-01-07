import { createSlice } from "@reduxjs/toolkit";

const initial = {
    startLocation: {
        latitude: null,
        longitude: null
    }
}


const locationSlice = createSlice({
    name: "location",
    initialState: initial,
    reducers: {
        setLocation: (state, action) => {
            state.startLocation.latitude = action.payload.latitude
            state.startLocation.longitude = action.payload.longitude
        }
    }
})

export const { setLocation } = locationSlice.actions
export default locationSlice.reducer