import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASEURL } from "../config/url";


export const getDocs = createAsyncThunk("doc/getDocs", async ({ token }) => {

    const response = await axios.get(`${BASEURL}/api/deliveryBoy/getDocsStatus`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })


    return response?.data?.data

})

const docSlice = createSlice({
    name: "doc",
    initialState: {
        pendingDocs: [],
        completedDocs: [],
        loading: false,
        error: null,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getDocs.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getDocs.fulfilled, (state, action) => {
            state.pendingDocs = action.payload.pendingDocuments
            state.completedDocs = action.payload.completedDocuments
            state.loading = false
        })
        builder.addCase(getDocs.rejected, (state, action) => {
            state.error = action.error.message
            state.loading = false
        })
    }
})

export default docSlice.reducer