import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    isAuthenticated: false,
    phone: null,
    otp: null,
    docVerified: "pending"
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
        },
        setIsDocVerified: (state, action) => {
            state.docVerified = action.payload
        }
    }
})

export const { setIsAuthenticated, setOtp, setPhone, setToken, setIsDocVerified } = authSlice.actions

export default authSlice.reducer