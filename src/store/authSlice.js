import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    isAuthenticated: false,
    phone: null,
    otp: null

}


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
        },
        setOtp: (state, action) => {
            state.otp = action.payload
        },
        setPhone: (state, action) => {
            state.phone = action.payload
        },
        setIsAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload
        }
    }
})

export const { setIsAuthenticated, setOtp, setPhone, setToken } = authSlice.actions

export default authSlice.reducer